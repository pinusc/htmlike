from django.shortcuts import render
from django_ajax.decorators import ajax
import json


# Create your views here.
def index(request):
    return render(request, 'game/index.html')


@ajax
def level(request):
    """
    Return a JSON level, for now it is loaded from a file, in future it will be
    generated
    """
    with open("game/static/game/assets/map.json", 'r') as f:
        tt = f.read()
        t = json.loads(tt)
    return t
