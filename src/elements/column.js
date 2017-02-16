/** Class representing a column. */ 
class Column {
	static NAME = 'column';

	/**
	 * Create a column.
	 * @param {number} id - Column ID.
	 * @param {String} name - Column name.
	 */
	constructor(id, name) {
		this.id = id
		this.name = name
	}

	/**
	 * Get the column's name.
	 * @return {String}
	 */
	getName() {
		return this.name
	}

	/**
	 * Set the column's name.
	 * @param {String} name - New column's name.
	 */
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