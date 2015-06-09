from flask import Flask, render_template
from flask_sockets import Sockets
import json

app = Flask(__name__)
sockets = Sockets(app)
# app.config['SECRET_KEY'] = 'secret!'


@app.route("/")
def hello():
    return render_template('index.html')


# @socketio.on('connect', namespace="/game")
@sockets.route('/game')
def test_connect(ws):
    with open('static/assets/map.json', 'r') as f:
        m = f.read()
    j = json.loads(m)
    with open('log', 'w') as f:
        f.write(str(type(j)))
    ws.send(m)
