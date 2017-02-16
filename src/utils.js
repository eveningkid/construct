/**
 * Utilitaries functions.
 */

import _ from 'underscore'

import {
	Column,
	Connection, 
	Label, 
	Node,
} from './elements'

/**
 * Retrieve the corresponding elements list matching a given type.
 * @param {Object} store - Data to be used.
 * @param {String} type - 
 * @return {Array}
 */
export const getElementsList = (store, type) => {
	switch (type) {
		case Node.NAME:
			return store.nodes

		case Column.NAME:
			return store.columns

		case Connection.NAME:
			return store.connections

		case Label.NAME:
		default:
			return store.labels
	}
}

/**
 * Retrieve an element by ID among a list of elements.
 * @param {Array} elementsList - List of elements to look into.
 * @return {Mixed}
 */
export const findElementById = (elementsList, id) => _.findWhere(elementsList, {id})

/**
 * Retrieve an element for a given connection element.
 * @param {Object} store - Data to be used.
 * @param {Connection} connectionElement - Connection instance.
 * @return {Node}
 */
export const findElement = (store, connectionElement) => {
	const elementsList = getElementsList(store, connectionElement.type)
	return findElementById(elementsList, connectionElement.id)
} 

/**
 * Get name for a given connection element (either a starting or ending one).
 * @param {Object} store - Data to be used.
 * @param {Connection} connectionElement - Connection instance.
 * @return {String}
 */
export const getNameForConnectionElement = (store, connectionElement) => {
	const element = findElement(store, connectionElement)

	if (connectionElement.type === 'connection') {
		// Connection
		return element.id
	} else {
		// Any other
		return element.name
	}
}

/**
 * Reverse one given connection's edges (start <-> end).
 * @param {Connection} connection - Initial Connection instance.
 * @return {Connection} Reversed connection.
 */
export const getReversedConnection = (connection) => {
	return new Connection(connection.id, connection.end, connection.start)
}