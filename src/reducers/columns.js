import _ from 'underscore'
import {EDIT_COLUMN} from '../actions/actionTypes'
import {Column} from '../elements'

const initialState = [
	new Column(0, 'Antecedents'),
	new Column(1, 'Mediators'),
	new Column(2, 'Outcomes'),
]

const columns = (state = initialState, action) => {
	switch (action.type) {
		case EDIT_COLUMN:
			return state
					.slice(0, action.index)
					.concat(action.column, state.slice(action.index + 1, state.length))

		default:
			return state
	}
}

export default columns