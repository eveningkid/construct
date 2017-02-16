/**
 * Connections actions
 */

import {
	ADD_CONNECTION,
	EDIT_CONNECTION,
	REMOVE_CONNECTION,
} from './actionTypes'

/**
 * Add a Connection object.
 * @param {Connection} connection - Connection value to add.
 * @return {Object} Dispatched action.
 */
export const addConnection = (connection) => {
	return {
		type: ADD_CONNECTION,
		connection
	}
}

/**
 * Edit a Connection object.
 * @param {number} index - Connection index from the state array.
 * @param {Connection} connection - New Connection object value.
 * @return {Object} Dispatched action.
 */
export const editConnection = (index, connection) => {
	return {
		type: EDIT_CONNECTION,
		index,
		connection
	}
}

/**
 * Remove a Connection object.
 * @param {Connection} connection - Connection value to remove.
 * @return {Object} Dispatched action.
 */
export const removeConnection = (connection) => {
	return {
		type: REMOVE_CONNECTION,
		connection
	}
}