import {
	ADD_NODE,
	EDIT_NODE,
	REMOVE_NODE,
	ADD_CONNECTION,
	EDIT_CONNECTION,
	REMOVE_CONNECTION,
	ADD_LABEL,
	EDIT_LABEL,
	REMOVE_LABEL,
	SET_INSPECTOR_CURRENT_ELEMENT,
	SET_EDITOR_CURRENT_ACTION,
	EDIT_COLUMN,
} from './actionTypes'

export const addNode = (node) => {
	return {
		type: ADD_NODE,
		node
	}
}

export const editNode = (index, node) => {
	return {
		type: EDIT_NODE,
		index,
		node
	}
}

export const removeNode = (node) => {
	return {
		type: REMOVE_NODE,
		node
	}
}

export const addConnection = (connection) => {
	return {
		type: ADD_CONNECTION,
		connection
	}
}

export const editConnection = (index, connection) => {
	return {
		type: EDIT_CONNECTION,
		index,
		connection
	}
}

export const removeConnection = (connection) => {
	return {
		type: REMOVE_CONNECTION,
		connection
	}
}

export const addLabel = (label) => {
	return {
		type: ADD_LABEL,
		label
	}
}

export const editLabel = (index, label) => {
	return {
		type: EDIT_LABEL,
		index,
		label
	}
}

export const removeLabel = (label) => {
	return {
		type: REMOVE_LABEL,
		label
	}
}

export const setInspectorCurrentElement = (element) => {
	return {
		type: SET_INSPECTOR_CURRENT_ELEMENT,
		element
	}
}

export const setEditorCurrentAction = (action) => {
	return {
		type: SET_EDITOR_CURRENT_ACTION,
		action
	}
}

export const editColumn = (index, column) => {
	return {
		type: EDIT_COLUMN,
		index,
		column
	}
}