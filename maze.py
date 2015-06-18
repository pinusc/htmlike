import random

def get_neighbour(matrix, x, y, direction):
    if direction == 0:
        if 0 <= x and y - 1 >= 0 and x < len(matrix) and y - 1 < len(matrix[1]):
            return matrix[x][y - 1]
    elif direction == 1:
        if 0 <= x + 1 and y >= 0 and x + 1 < len(matrix) and y - 1 < len(matrix[1]):
            return matrix[x + 1][y]
    elif direction == 2:
        if 0 <= x and y + 1 >= 0 and x < len(matrix) and y + 1 < len(matrix[1]):
            return matrix[x][y + 1]
    elif direction == 3:
        if 0 <= x - 1 and y >= 0 and x - 1 < len(matrix) and y - 1 < len(matrix[1]):
            return matrix[x - 1][y]
    else:
        return None

def adj(matrix, x, y):
    """Returns the list of adjacencies for a given coordinate in a given matrix
    return format = a list of boolean [up, right, down, left]"""
    l = [False, False, False, False]
    l = [False if get_neighbour(matrix, x, y, i) else True for i in range(len(l))]
    return tuple(l)

def carve(matrix, x, y, seed=None):
    """Randomly removes a square that is adjacent to the given coordinates"""
    a = adj(matrix, x, y)
    random.seed(seed)
    to_carve = random.choice([i for i, k in enumerate(a) if not k])
    if to_carve == 0:
        matrix[x][y - 1] = False
    elif to_carve == 1:
        matrix[x + 1][y] = False
    elif to_carve == 2:
        matrix[x][y + 1] = False
    elif to_carve == 3:
        matrix[x - 1][y] = False

