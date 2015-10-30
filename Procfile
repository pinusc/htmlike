web: $(npm bin)/coffee -o static/js -c static/src/coffee && gunicorn --worker-class socketio.sgunicorn.GeventSocketIOWorker main:app
