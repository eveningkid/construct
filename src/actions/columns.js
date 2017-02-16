/**
 * Columns actions
 */

import {EDIT_COLUMN} from './actionTypes'

/**
 * Edit a Column object.
 * @param {number} index - Column index from the state array.
 * @param {Column} column - New Column object value.
 * @return {Object} Dispatched action.
 */
export const editColumn = (index, column) => {
	return {
		type: EDIT_COLUMN,
		index,
		column
	}
}