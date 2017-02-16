/** Class representing a node. */ 
class Node {
	static NAME = 'node';
	static ITEMS_TYPE_REFLECTIVE = 'reflective';
	static ITEMS_TYPE_FORMATIVE = 'formative';

	/**
	 * Create a node.
	 * @param {number} id - Node ID.
	 * @param {number} coordX - Node X coordinate.
	 * @param {number} coordY - Node Y coordinate.
	 * @param {String} name - Node name, label.
	 * @param {number[]} labels - Labels IDs associated to the node.
	 * @param {Boolean} temporary - If this node should appear as temporary.
	 * @param {String} itemsType - Node items' type.
	 */
	constructor(id, coordX, coordY, name='', labels=[], temporary=false, itemsType=Node.ITEMS_TYPE_REFLECTIVE) {
		this.id = id
		this.coords = {
			x: coordX,
			y: coordY
		}
		this.name = name
		this.labels = labels
		this.temporary = temporary
		this.itemsType = itemsType
	}

	/**
	 * Get the node's coordinates.
	 * @return {Object}
	 */
	getCoords() {
		return this.coords
	}

	/**
	 * Get the node's name.
	 * @return {String}
	 */
	getName() {
		return this.name
	}

	/**
	 * Get the node's labels ID list.
	 * @return {number[]}
	 */
	getLabels() {
		return this.labels
	}

	/**
	 * Is the node temporary?
	 * @return {Boolean}
	 */
	isTemporary() {
		return this.temporary
	}

	/**
	 * Get the node's items' type.
	 * @return {String}
	 */
	getItemsType() {
		return this.itemsType
	}

	/**
	 * Set the node's coordinates.
	 * @param {number} coordX - New X position on the grid.
	 * @param {number} coordY - New Y position on the grid.
	 */
	setCoords(coordX, coordY) {
		this.coords = {
			x: coordX,
			y: coordY
		}
	}

	/**
	 * Set the node's name.
	 * @param {String} name - New node's name.
	 */
	setName(name) {
		this.name = name
	}

	/**
	 * Set the labels' list.
	 * @param {number[]} labels - New labels' list.
	 */
	setLabels(labels) {
		this.labels = labels
	}

	/**
	 * Set if the node is temporary.
	 * @param {Boolean} temporary - New temporary status.
	 */
	setTemporary(temporary) {
		this.temporary = temporary
	}

	/**
	 * Set the node's items' type.
	 * @param {String} itemsType - New node's items' type.
	 */
	setItemsType(itemsType) {
		this.itemsType = itemsType
	}

	toString() {
		const description = {
			id: this.id,
			coords: this.coords,
			name: this.name,
			labels: this.labels,
			temporary: this.temporary,
			itemsType: this.itemsType,
		}

		return JSON.stringify(description)
	}
}

export default Node