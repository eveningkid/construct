/** Class representing a label. */ 
class Label {
	static NAME = 'label';

	/**
	 * Create a label.
	 * @param {number} id - Label ID.
	 * @param {string} name - Label name.
	 */
	constructor(id, name) {
		this.id = id
		this.name = name
	}

	setName(name) {
		this.name = name
	}

	toString() {
		const description = {
			id: this.id,
			name: this.name,
		}

		return JSON.stringify(description)
	}
}

export default Label