import {SET_INSPECTOR_CURRENT_ELEMENT} from '../actions/actionTypes'

const initialState = {
	currentElement: null,
}

const inspector = (state = initialState, action) => {
	switch (action.type) {
		case SET_INSPECTOR_CURRENT_ELEMENT:
			return {
				...state,
				currentElement: action.element,
			}

		default:
			return state
	}
}

export default inspector