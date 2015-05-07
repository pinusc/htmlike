from django.shortcuts import render
from django_ajax.decorators import ajax

# Create your views here.
def index(request):
    print("called index")
    return render(request, 'game/index.html')


@ajax
def level(request):
    print("called level")
    t = [  ## x and y are reversed
        "  #####        ",
        "  #   #        ",
        "  #   #        ",
        "  ## ##        ",
        "               ",
        "               ",
        "               ",
        "               ",
        "               ",
        "               ",
        "               ",
        "               ",
        "               ",
        "               ",
        "               ",]
    with open("game/static/game/level.txt", 'r') as f:
        t = f.readlines()
    return {'t': t}
