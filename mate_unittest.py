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

if __name__ == '__main__':
	unittest.main()
