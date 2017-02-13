import _ from 'underscore'
import {
	Column,
	Connection, 
	Label, 
	Node,
} from './elements'

// Retrieve the corresponding elements list matching a given type
export const getElementsList = (store, type) => {
	switch (type) {
		case Node.NAME:
			return store.nodes

		case Column.NAME:
			return store.columns

		case Connection.NAME:
			return store.connections

		case Label.NAME:
		default:
			return store.labels
	}
}

// Retrieve an element by ID among a list of elements
export const findElementById = (elementsList, id) => _.findWhere(elementsList, {id})

// Retrieve an element for a given connection element
export const findElement = (store, connectionElement) => {
	const elementsList = getElementsList(store, connectionElement.type)
	return findElementById(elementsList, connectionElement.id)
} 

// Get name for a given connection element (either a starting or ending one)
export const getNameForConnectionElement = (store, connectionElement) => {
	const element = findElement(store, connectionElement)

	if (connectionElement.type === 'connection') {
		// Connection
		return element.id
	} else {
		// Any other
		return element.name
	}
}