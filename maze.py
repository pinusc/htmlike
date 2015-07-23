import random
import sys
import json

def get_neighbour(matrix, x, y, direction, count=1):
    """Starting with the cell at [x][y], walking in versus direction for count steps...
    You end up in a cell. This method return True if that cell exist and is True, False otherwise
    """
    if direction == 0:
        cx = 0
        cy = -count
    elif direction == 1:
        cx = count
        cy = 0
    elif direction == 2:
        cx = 0
        cy = count
    elif direction == 3:
        cx = -count
        cy = 0
    xx, yy = x + cx, y + cy
    if not (0 <= xx and  0 <= yy and xx < len(matrix) and yy < len(matrix[0])):
        # Coordinates not in the grid
        return None
    else:
        return matrix[xx][yy]

def adjacencies(matrix, x, y):
    """Return a boolean list [up, right, down, left] where each element is True if that cell exist and is true"""
    l = [False, False, False, False]
    l = [get_neighbour(matrix, x, y, i, 2) for i in range(len(l))]
    return tuple(l)

def carve(matrix, x, y, seed=None):
    """Randomly removes a square that is adjacent to the given coordinates"""
    random.seed(seed)

    a = [i for i, k in enumerate(adjacencies(matrix, x, y)) if k]
    if not a: return False
    to_carve = random.choice(a)

    # there must be removed and counted two cells because of walls
    xc = x
    xcc = x
    yc = y
    ycc = y
    if to_carve == 0:
        yc = y - 1
        ycc = y - 2
    elif to_carve == 1:
        xc = x + 1
        xcc = x + 2
    elif to_carve == 2:
        yc = y + 1
        ycc = y + 2
    elif to_carve == 3:
        xc = x - 1
        xcc = x - 2
    matrix[xc][yc] = False
    matrix[xcc][ycc] = False
    return xcc, ycc


def generate_maze(height, width):
    "return a matrix of height * width where True equals a wall and False is free"
    maze = [[True for i in range(height)] for j in range(width)]
    lcarve = [(0, 0)]
    while(lcarve):
        cx, cy = lcarve[-1]
        new = carve(maze, cx, cy)
        if new:
            nx, ny = new
            lcarve.append((nx, ny))
        else:
            lcarve.pop()  # since there are no cells next to the current, remove the current cell from the list
        #printMaze(maze)
        #raw_input("Press any key...")
    return maze

def printMaze(a):
    "Used for debugging purposes"
    for i in a:
        for j in i:
            if j:
                sys.stdout.write('#')
            else:
                sys.stdout.write('.')
        print

def maze_to_json(maze):
    height = len(maze)
    width = len(maze[0])

    groundTiles = range(1073, 1077)
    wallTiles = range(1142, 1152)
    with open("templates/map.json", 'r') as f:
        jmap_str = f.read()
    with open("templates/layer.json", 'r') as f:
        jlayer_str = f.read()
    jmap = json.loads(jmap_str)
    jlayer0 = json.loads(jlayer_str)
    layer0 = [random.choice(groundTiles) for i in range(width * height)]
    jlayer0["data"] = layer0
    jlayer0["height"] = height
    jlayer0["width"] = width
    jlayer0["name"] = "ground"

    jlayer1 = json.loads(jlayer_str)
    layer1 = []
    for i in maze:
        for j in i:
            if j:
                layer1.append(random.choice(wallTiles))
            else:
                layer1.append(0)
    jlayer1["data"] = layer1
    jlayer1["height"] = height
    jlayer1["width"] = width
    jlayer1["name"] = "walls"

    jmap["height"] = height
    jmap["width"] = width
    jmap["layers"] = [jlayer0, jlayer1]

    return jmap

def generate_map(height, width):
    return maze_to_json(generate_maze(height, width))


if __name__ == '__main__':
    a = generate_maze(25, 25)
    printMaze(a)
