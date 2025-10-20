from app.config.config import Config
from app.models.model_loader import LoadModel
from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import threading
import time
import numpy as np

app = Flask(__name__)
CORS(app, origins="*")
socketio = SocketIO(app, cors_allowed_origins="*")

# Global variable to control simulation
simulation_running = False
simulation_thread = None


@app.route("/")
def home():
    obj = LoadModel()
    print(obj.load_dataset(Config.DATASET_PATH))

    return "Hello from flask!"


def convert_to_json_serializable(obj):
    """Convert NumPy types to Python native types for JSON serialization"""
    if isinstance(obj, dict):
        return {key: convert_to_json_serializable(value) for key, value in obj.items()}
    elif isinstance(obj, list):
        return [convert_to_json_serializable(item) for item in obj]
    elif isinstance(obj, (np.integer, np.int64, np.int32)):
        return int(obj)
    elif isinstance(obj, (np.floating, np.float64, np.float32)):
        return float(obj)
    elif isinstance(obj, np.ndarray):
        return obj.tolist()
    else:
        return obj


def run_simulation(step_size=10, delay=1.0, step_config=None):
    """
    Run the prediction simulation in a separate thread

    Args:
        step_size: Number of rows to skip between predictions
        delay: Delay in seconds between each emission
    """
    global simulation_running

    print("🎬 Starting simulation...")

    # Create the batch prediction generator
    prediction_generator = LoadModel.batch_predict_with_interval(
        Config.DATASET_PATH,
        Config.MODEL_PATH,
        Config.COMPONENTS_PATH,
        start_index=0,
        step_size=step_size,
        step_config=step_config,
    )

    for result in prediction_generator:
        if not simulation_running:
            print("⏹️  Simulation stopped")
            break

        serialized_result = convert_to_json_serializable(result)
        # Emit the data to all connected clients
        socketio.emit("prediction_update", serialized_result)
        print(result)
        print(
            f"📤 Sent data for row {result['row_index']} (step: {result.get('current_step_size', step_size)})"
        )
        # Wait before sending next update
        time.sleep(delay)

    simulation_running = False
    socketio.emit("simulation_complete", {"message": "Simulation completed"})
    print("✅ Simulation completed")


@socketio.on("connect")
def handle_connect():
    print("Client Connected")
    emit("message", {"data": "Connected to server!"})


@socketio.on("disconnect")
def handle_disconnect():
    # client disconnected
    print("Client disconnected")


@socketio.on("start_simulation")
def handle_start_simulation(data):
    """
    Start the simulation when client requests it

    Expected data format:
    {
        "step_size": 10,           # Optional, default 10 (used if no step_config)
        "delay": 1.0,              # Optional, default 1.0 seconds
        "step_config": [           # Optional, for variable step sizes
            [1500, 20],            # Use step 20 until row 1500
            [1800, 5],             # Then step 5 until row 1800
            [3000, 2]              # Then step 2 until row 3000
        ]
    }
    """
    global simulation_running, simulation_thread

    if simulation_running:
        emit("error", {"message": "Simulation already running"})
        return

    step_size = data.get("step_size", 10)
    delay = data.get("delay", 1.0)

    # Get step configuration if provided
    step_config_raw = data.get("step_config", None)
    step_config = None

    if step_config_raw:
        # Convert list of lists to list of tuples
        step_config = [
            (int(threshold), int(step)) for threshold, step in step_config_raw
        ]

    simulation_running = True
    simulation_thread = threading.Thread(
        target=run_simulation, args=(step_size, delay, step_config), daemon=True
    )
    simulation_thread.start()

    response_data = {
        "message": "Simulation started",
        "step_size": step_size,
        "delay": delay,
    }

    if step_config:
        response_data["step_config"] = step_config

    emit("simulation_started", response_data)


@socketio.on("stop_simulation")
def handle_stop_simulation():
    """Stop the running simulation"""
    global simulation_running

    if not simulation_running:
        emit("error", {"message": "No simulation running"})
        return

    simulation_running = False
    emit("simulation_stopped", {"message": "Simulation stopped"})


if __name__ == "__main__":
    socketio.run(app, debug=True)
    # handle_start_simulation()
