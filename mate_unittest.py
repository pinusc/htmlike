import unittest
from maze import *

m = [[0, 1, 0, 1, 1, 1],
     [0, 1, 0, 0, 0, 1],
     [0, 1, 1, 1, 0, 1],
     [0, 0, 0, 1, 0, 0],
     [0, 1, 0, 1, 0, 1],
     [0, 1, 0, 0, 0, 0]]

class MazeTest(unittest.TestCase):
	def test(self):
		self.assertEqual(adj(m, 4, 3), (True, True, True, False))

	def test_edit_distance(self):
		m1 = [i[:] for i in m]
		m1[3][3] = False
		m1[3][4] = True
		self.assertEqual(edit_distance(m, m1), 2)

	def test_carve(self):
		m1 = [i[:] for i in m]
		carve(m1, 4, 3)
		self.assertEqual(edit_distance(m, m1), 1)

def edit_distance(a, b):
	changes = 0
	for i in range(len(a)):
		changes += levenshtein(a[i], b[i])
	return changes

def levenshtein(a,b):
    "Calculates the Levenshtein distance between a and b."
    n, m = len(a), len(b)
    if n > m:
        # Make sure n <= m, to use O(min(n,m)) space
        a,b = b,a
        n,m = m,n
        
    current = range(n+1)
    for i in range(1,m+1):
        previous, current = current, [i]+[0]*n
        for j in range(1,n+1):
            add, delete = previous[j]+1, current[j-1]+1
            change = previous[j-1]
            if a[j-1] != b[i-1]:
                change = change + 1
            current[j] = min(add, delete, change)
            
    return current[n]

if __name__ == '__main__':
	unittest.main()
