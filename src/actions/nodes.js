/**
 * Nodes actions
 */

import {
	ADD_NODE,
	EDIT_NODE,
	REMOVE_NODE,
} from './actionTypes'

/**
 * Add a Node object.
 * @param {Node} node - Node value to add.
 * @return {Object} Dispatched action.
 */
export const addNode = (node) => {
	return {
		type: ADD_NODE,
		node
	}
}

/**
 * Edit a Node object.
 * @param {number} index - Node index from the state array.
 * @param {Node} node - New Node object value.
 * @return {Object} Dispatched action.
 */
export const editNode = (index, node) => {
	return {
		type: EDIT_NODE,
		index,
		node
	}
}

/**
 * Remove a Node object.
 * @param {Node} node - Node value to remove.
 * @return {Object} Dispatched action.
 */
export const removeNode = (node) => {
	return {
		type: REMOVE_NODE,
		node
	}
}