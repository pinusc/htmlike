import random
import sys

def get_neighbour(matrix, x, y, direction, coor=False):
    xx, yy = x, y
    if direction == 0:
        if 0 <= x and y - 1 >= 0 and x < len(matrix) and y - 1 < len(matrix[1]):
            xx = x
            yy = y - 1
    elif direction == 1:
        if 0 <= x + 1 and y >= 0 and x + 1 < len(matrix) and y - 1 < len(matrix[1]):
            xx = x + 1
            yy = y
    elif direction == 2:
        if 0 <= x and y + 1 >= 0 and x < len(matrix) and y + 1 < len(matrix[1]):
            xx = x
            yy = y + 1
    elif direction == 3:
        if 0 <= x - 1 and y >= 0 and x - 1 < len(matrix) and y - 1 < len(matrix[1]):
            xx = x - 1
            yy = y
    else:
        return None
    if coor:
        return xx, yy
    else:
        return matrix[xx][yy]

def adjacencies(matrix, x, y):
    """Returns the list of adjacencies for a given coordinate in a given matrix
    return format = a list of boolean [up, right, down, left]"""
    l = [False, False, False, False]
    l = [False if get_neighbour(matrix, x, y, i) else True for i in range(len(l))]
    return tuple(l)

def adj(matrix, x, y):
    l = [False, False, False, False]
    l = [False if get_neighbour(matrix, x, y, i) else True for i in range(len(l))]
    for d, i in enumerate(l):
        if i:
            continue
        cx, cy = get_neighbour(matrix, x, y, d, True)
        if adjacencies(matrix, cx, cy).count(True) >= 2:
            l[d] = True
    return tuple(l)

def carve(matrix, x, y, seed=None):
    """Randomly removes a square that is adjacent to the given coordinates"""
    random.seed(seed)

    a = [i for i, k in enumerate(adj(matrix, x, y)) if not k]
    if not a: return False
    to_carve = random.choice(a)

    xc = x
    yx = y
    if to_carve == 0:
        xc = x
        yc = y - 1
    elif to_carve == 1:
        xc = x + 1
        yc = y
    elif to_carve == 2:
        xc = x
        yc = y + 1
    elif to_carve == 3:
        xc = x - 1
        yc = y
    matrix[xc][yc] = False
    return xc, yc


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
                sys.stdout.write(' ')
        print

if __name__ == '__main__':
    a = generate_maze(25, 25)
    printMaze(a)
