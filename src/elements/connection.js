/** Class representing a connection between two elements. */ 
class Connection {
	static NAME = 'connection';

	/**
	 * Create a connection.
	 * @param {String} id - Connection ID.
	 * @param {Object{type, id}} start - Starting node.
	 * @param {Object{type, id}} end - Ending node.
	 */
	constructor(id, start, end) {
		this.id = id
		this.start = start
		this.end = end
	}

	toString() {
		const description = {
			start: this.start,
			end: this.end,
		}

		return JSON.stringify(description)
	}
}

export default Connection