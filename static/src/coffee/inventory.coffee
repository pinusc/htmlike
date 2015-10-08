class @Inventory
	constructor: () ->
		# arr is the main inventory with generic objects
		this.arr = []
		#mainweapon is the slot for melee weapon
		this.mainWeapon = new Items.Fists()
		null

	add: (item) ->
		#TODO: limit inventory slot number
		if item instanceof Item
			#this if player found a weapon and hasn't got one, auto-equip it
			if item instanceof Items.Weapon and this.mainWeapon instanceof Items.Fists
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


