window.distance = (coord1, coord2) ->
  if coord1.isEntity
    # extract coordinates from entity
    coord1 = [coord1.posx, coord1.posy]
  if coord2.isEntity
    # extract coordinates from entity
    coord2 = [coord2.posx, coord2.posy]
  x1 = coord1[0]
  y1 = coord1[1]

  x2 = coord2[0]
  y2 = coord2[1]

  difx = x1 - x2
  dify = y1 - y2
  dist = Math.sqrt(difx * difx + dify * dify)
  return dist

window.direction = (x1, y1, x2, y2) ->
  xdiff = Math.abs(x1 - x2)
  ydiff = Math.abs(y1 - y2)
  if xdiff > ydiff
    if x1 > x2
      return "right"
    else
      return "left"
  else
    if y1 > y2
      return "down"
    else
      return "up"

window.roll = (number, faces) ->
  total = 0
  for i in [0...number]
    total += Math.floor(Math.random() * (faces - 1 + 1)) + 1
  return total

window.r2d6 = () ->
  # roll 2d6
  return roll(2, 6)
