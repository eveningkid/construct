/**
 * Editor actions
 */

import {SET_EDITOR_CURRENT_ACTION} from './actionTypes'

/**
 * Set the current Editor's action (inspect, add node, ...).
 * @param {String} action - Action string (a constant among the ones from /constants/).
 * @return {Object} Dispatched action.
 */
export const setEditorCurrentAction = (action) => {
	return {
		type: SET_EDITOR_CURRENT_ACTION,
		action
	}
}