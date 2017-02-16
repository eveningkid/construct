import {SET_EDITOR_CURRENT_ACTION} from '../actions/actionTypes'

const initialState = {
	currentAction: 'inspect',
}

const editor = (state = initialState, action) => {
	switch (action.type) {
		case SET_EDITOR_CURRENT_ACTION:
			return {
				...state,
				currentAction: action.action,
			}

		default:
			return state
	}
}

export default editor