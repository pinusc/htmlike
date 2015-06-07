from flask import Flask, render_template
from flask.ext.socketio import SocketIO, emit
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


@app.route("/")
def hello():
    return render_template('index.html')


@socketio.on('message', namespace="/game")
def handle_message(message):
    print('received message: ' + str(message))


@socketio.on('connect', namespace="/game")
def test_connect():
    with open('static/assets/map.json', 'r') as f:
        m = f.read()
    emit('map', json.loads(m))

if __name__ == '__main__':
    socketio.run(app)
