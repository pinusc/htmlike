def adj(matrix, x, y):
    l = [False, False, False, False]
    if 0 <= x and y >= 0 - 1 and x < len(matrix) and y - 1 < len(matrix[1]) and not matrix[x][y - 1]:
        l[0] = True
    if 0 <= x + 1 and y >= 0 and x + 1 < len(matrix) and y < len(matrix[1]) and not matrix[x + 1][y]:
        l[1] = True
    if 0 <= x and y + 1 >= 0 and x < len(matrix) and y + 1 < len(matrix[1]) and not matrix[x][y + 1]:
        l[2] = True
    if 0 <= x - 1 and y >= 0 and x - 1 < len(matrix) and y < len(matrix[1]) and not matrix[x - 1][y]:
        l[3] = True
    return tuple(l)

def carve(matrix, x, y, seed=None):
    pass