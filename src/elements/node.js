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
	 * @param {string} name - Node name, label.
	 * @param {number[]} labels - Labels IDs associated to the node.
	 * @param {boolean} temporary - If this node should appear as temporary.
	 * @param {string} itemsType - Node items' type.
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

	getCoords() {
		return this.coords
	}

	getName() {
		return this.name
	}

	getLabels() {
		return this.labels
	}

	isTemporary() {
		return this.temporary
	}

	getItemsType() {
		return this.itemsType
	}

	setCoords(coordX, coordY) {
		this.coords = {
			x: coordX,
			y: coordY
		}
	}

	setName(name) {
		this.name = name
	}

	setLabels(labels) {
		this.labels = labels
	}

	setTemporary(temporary) {
		this.temporary = temporary
	}

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