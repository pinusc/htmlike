from django.shortcuts import render
from django_ajax.decorators import ajax

# Create your views here.
def index(request):
    return render(request, 'game/index.html')


@ajax
def level(request):
    """
    Return a JSON level, for now it is loaded from a file, in future it will be
    generated
    """
    with open("game/static/game/level.txt", 'r') as f:
        t = f.readlines()
    return {'t': t}
