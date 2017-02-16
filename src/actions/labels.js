/**
 * Labels actions
 */

import {
	ADD_LABEL,
	EDIT_LABEL,
	REMOVE_LABEL,
} from './actionTypes'

/**
 * Add a Label object.
 * @param {Label} label - Label value to add.
 * @return {Object} Dispatched action.
 */
export const addLabel = (label) => {
	return {
		type: ADD_LABEL,
		label
	}
}

/**
 * Edit a Label object.
 * @param {number} index - Label index from the state array.
 * @param {Label} label - New Label object value.
 * @return {Object} Dispatched action.
 */
export const editLabel = (index, label) => {
	return {
		type: EDIT_LABEL,
		index,
		label
	}
}

/**
 * Remove a Label object.
 * @param {Label} label - Label value to remove.
 * @return {Object} Dispatched action.
 */
export const removeLabel = (label) => {
	return {
		type: REMOVE_LABEL,
		label
	}
}