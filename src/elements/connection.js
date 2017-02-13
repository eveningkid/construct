/** Class representing a connection between two elements. */ 
class Connection {
	static NAME = 'connection';

	/**
	 * Create a connection.
	 * @param {string} id - Connection ID.
	 * @param {number} start - Starting node ID.
	 * @param {number} end - Ending node ID.
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