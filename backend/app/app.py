from flask import Flask
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from app.config.config import Config
from app.models.model_loader import LoadModel

app = Flask(__name__)
CORS(app, origins="*")
socketio = SocketIO(app, cors_allowed_origins="*")


@app.route("/")
def home():
    obj = LoadModel()
    print(obj.load_dataset(Config.DATASET_PATH))

    return "Hello from flask!"


@socketio.on("connect")
def handle_connect():
    print("Client Connected")
    emit("message", {"data": "Connected to server!"})


@socketio.on("disconnect")
def handle_disconnect():
    # client disconnected
    print("Client disconnected")


if __name__ == "__main__":
    socketio.run(app, debug=True)
