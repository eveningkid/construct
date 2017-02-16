/**
 * Inspector actions
 */

import {SET_INSPECTOR_CURRENT_ELEMENT} from './actionTypes'

/**
 * Set the current Inspector's element (Node, Connection, ...).
 * @param {Mixed} element - An element object value.
 * @return {Object} Dispatched action.
 */
export const setInspectorCurrentElement = (element) => {
	return {
		type: SET_INSPECTOR_CURRENT_ELEMENT,
		element
	}
}