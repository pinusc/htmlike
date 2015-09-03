# htmlike
*htmlike* is the code-name for a work in progress in-browser roguelike.  
It works on both desktop and mobile, altough some features are yet to implement one one device: it is in a very early developement stage and most features are missing.  
For now, I'm just implementing the basis for a fully working classical roguelike, mostly inspired by Angband, but as soon as it gets to a playable state, things will change a lot.  
The game is going to be inspired by Apocalypse World by Vincent Baker, thus becoming the first roguelike powered by the Apocalypse.

It uses Phaser as frontend game engine, while the backend is written in Python.  
If you just want to play the game, go to http://htmlike.herokuapp.com  
If you want to run a server locally, follow the build instructions.  

Build instructions:

- clone project
- make a 2.7 python virtualenv and install dependencies with pip

```
$ virtualenv2 venv  
$ venv/bin/activate  
(venv)$ pip install -r requirements.txt  
```
 
Now you can run the server in three ways:

1. With ```foreman``` (uses Procfile)  
```(venv)$ foreman run```  
2. Manually running gunicorn  
```(venv)$ gunicorn --worker-class socketio.sgunicorn.GeventSocketIOWorker main:app```  
3. Running main.py  
```(venv)$ python main.py```  
