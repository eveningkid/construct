import React, {createClass} from 'react'
import _ from 'underscore'
import {connect} from 'react-redux'

import {
	editConnection,
	removeConnection,
	setInspectorCurrentElement,
} from '../../actions'

import {findElement} from '../../utils'
import {Connection, Node} from '../../elements'
import {getNameForConnectionElement} from '../../utils'

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

const InspectorConnectionForm = createClass({
	getReversedConnection(connection) {
		return new Connection(connection.id, connection.end, connection.start)
	},

	handleReverse(connection) {
		const connections = this.props.connections

		const originalConnectionIndex = _.findIndex(connections, connection)
		const reversedConnection = this.getReversedConnection(connection)

		this.props.editConnection(originalConnectionIndex, reversedConnection)
		this.props.setInspectorCurrentElement(reversedConnection)
	},

	ableToReverse() {
		// TODO: only working for node-node connections, but not node-connection ones
		const store = this.props
		const {start, end} = this.getReversedConnection(store.currentElement)

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