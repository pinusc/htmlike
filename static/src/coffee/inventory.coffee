class @Inventory
	constructor: () ->
		this.arr = []
		this.mainWeapon = null
		null

	add: (item) ->
		#TODO: limit inventory slot number
		if item instanceof Item
			if item instanceof Items.Weapon and not this.mainWeapon  # if item is a weapon and player hasn't got one
				this.mainWeapon = item
			else
				this.arr.push(item)

	get: (n) ->
		this.arr[n]

	set: (n, item) ->
		if item instanceof Item
			this.arr[n] = item

	swap: (n, k) ->
		temp = this.arr[n]
		n = this.arr[k]
		k = temp


