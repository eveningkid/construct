import _ from 'underscore'

import {
	ADD_CONNECTION,
	EDIT_CONNECTION,
	REMOVE_CONNECTION,
} from '../actions/actionTypes'

const initialState = []

const connections = (state = initialState, action) => {
	switch (action.type) {
		case ADD_CONNECTION:
			return [...state, action.connection]

		case REMOVE_CONNECTION:
			return state.filter(connection => !_.isEqual(connection, action.connection))

		case EDIT_CONNECTION:
			return state
					.slice(0, action.index)
					.concat(action.connection, state.slice(action.index + 1, state.length))

		default:
			return state
	}
}

export default connections