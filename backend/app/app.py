from flask import Flask
from flask_socketio import SocketIO, emit
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="*")
socketio = SocketIO(app, cors_allowed_origins="*")


@app.route("/")
def home():
    return "Hello from flask!"


@socketio.on("connect")
def handle_connect():
    print("Client Connected")
    emit("message", {"data": "Connected to server!"})


if __name__ == "__main__":
    socketio.run(app, debug=True)
