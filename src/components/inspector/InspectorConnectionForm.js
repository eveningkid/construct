import React, {createClass} from 'react'
import _ from 'underscore'
import {connect} from 'react-redux'
import {Node} from '../../elements'

import {
	editConnection,
	removeConnection,
	setInspectorCurrentElement,
} from '../../actions'

import {
	findElement,
	getNameForConnectionElement,
	getReversedConnection,
} from '../../utils'

const mapStateToProps = (state) => {
	return {
		connections: state.connections,
		currentElement: state.inspector.currentElement,
		nodes: state.nodes,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		editConnection: (index, connection) => dispatch(editConnection(index, connection)),
		removeConnection: (connection) => dispatch(removeConnection(connection)),
		setInspectorCurrentElement: (element) => dispatch(setInspectorCurrentElement(element)),
	}
}

// Represent the inspector's connection form (when a connection is inspected).
const InspectorConnectionForm = createClass({
	/**
	 * Handle when we try to reverse a connection object.
	 * @param {Connection} connection - Connection instance to reverse.
	 */
	handleReverse(connection) {
		const connections = this.props.connections

		const originalConnectionIndex = _.findIndex(connections, connection)
		const reversedConnection = getReversedConnection(connection)

		this.props.editConnection(originalConnectionIndex, reversedConnection)
		this.props.setInspectorCurrentElement(reversedConnection)
	},

	/**
	 * Is the associated connection able to be reversed?
	 * @return {Boolean}
	 */
	ableToReverse() {
		// TODO: only working for node-node connections, but not node-connection ones
		const store = this.props
		const {start, end} = getReversedConnection(store.currentElement)

		// Temporary 'fix' || or is it actually the expected behaviour?
		if (start.type !== Node.NAME || end.type !== Node.NAME) {
			return false
		}

		const startElement = findElement(store, start)
		const endElement = findElement(store, end)

		const startElementCoords = startElement.getCoords()
		const endElementCoords = endElement.getCoords()

		return (startElementCoords.x === endElementCoords.x)
	},

	/**
	 * Handle when the given connection is removed.
	 * @param {Connection} connection - Connection instance to remove.
	 */
	handleRemove(connection) {
		const {connections} = this.props
		const originalConnection = connection

		for (let connection of connections) {
			if (connection.start.id === originalConnection.id || connection.end.id === originalConnection.id) {
				this.props.removeConnection(connection)
			}
		}

		this.props.removeConnection(connection)
		this.props.setInspectorCurrentElement(null)
	},

	render() {
		const store = this.props
		const {start, end} = store.currentElement

		return (
			<div>
				<p>
					Connection: from {start.type} {getNameForConnectionElement(store, start)}, 
					to {end.type} {getNameForConnectionElement(store, end)}.
				</p>

				{this.ableToReverse() ? (
					<button onClick={this.handleReverse.bind(this, store.currentElement)}>
						Reverse direction
					</button>
				) : null}

				<button onClick={this.handleRemove.bind(this, store.currentElement)}>
					Remove connection
				</button>
			</div>
		)
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(InspectorConnectionForm)