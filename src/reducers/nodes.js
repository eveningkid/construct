import _ from 'underscore'

import {
	ADD_NODE,
	EDIT_NODE,
	REMOVE_NODE,
} from '../actions/actionTypes'

const initialState = []

const nodes = (state = initialState, action) => {
	switch (action.type) {
		case ADD_NODE:
			return [...state, action.node]

		case REMOVE_NODE:
			return state.filter(node => !_.isEqual(node, action.node))

		case EDIT_NODE:
			return state
					.slice(0, action.index)
					.concat(action.node, state.slice(action.index + 1, state.length))

		default:
			return state
	}
}

export default nodes