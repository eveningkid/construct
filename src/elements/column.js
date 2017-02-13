/** Class representing a column. */ 
class Column {
	static NAME = 'column';

	/**
	 * Create a column.
	 * @param {number} id - Column ID.
	 * @param {string} name - Column name.
	 */
	constructor(id, name) {
		this.id = id
		this.name = name
	}

	getName() {
		return this.name
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

export default Column