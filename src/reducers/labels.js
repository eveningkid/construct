import _ from 'underscore'

import {
	ADD_LABEL,
	EDIT_LABEL,
	REMOVE_LABEL,
} from '../actions/actionTypes'

const initialState = []

const labels = (state = initialState, action) => {
	switch (action.type) {
		case ADD_LABEL:
			return [...state, action.label]

		case EDIT_LABEL:
			return state
					.slice(0, action.index)
					.concat(action.label, state.slice(action.index + 1, state.length))

		case REMOVE_LABEL:
			return state.filter(label => !_.isEqual(label, action.label))

		default:
			return state
	}
}

export default labels