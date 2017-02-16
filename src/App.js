import React, {createClass} from 'react'
import _ from 'underscore'
import {connect} from 'react-redux'
import uniqid from 'uniqid'

import {
	Layer, 
	Circle, 
	Stage, 
	Arrow,
	Text,
	Group,
} from 'react-konva'

import Inspector from './components/inspector/Inspector'
import Grid from './components/grid/Grid'
import Navigation from './components/navigation/Navigation'
import ElementsList from './components/elements-list/ElementsList'

import {
	Connection, 
	Node,
} from './elements'

import {
	addConnection, 
	editConnection,
	editNode,
	setInspectorCurrentElement,
} from './actions'


import {
	EDITOR_ACTION_ADD_CONNECTION,
	NODE_MARGIN,
	NODE_CIRCLE_RADIUS,
	CANVAS_MARGIN,
} from './constants'

import {
	getElementsList,
	findElementById,
} from './utils'

const mapStateToProps = (state) => {
	return {
		columns: state.columns,
		nodes: state.nodes,
		editor: state.editor,
		connections: state.connections,
		inspectorCurrentElement: state.inspector.currentElement,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addConnection: (connection) => dispatch(addConnection(connection)),
		editConnection: (index, connection) => dispatch(editConnection(index, connection)),
		editNode: (index, node) => dispatch(editNode(index, node)),
		setInspectorCurrentElement: (element) => dispatch(setInspectorCurrentElement(element)),
	}
}

// Represent the Construct application.
const App = createClass({
	getInitialState() {
		return {
			isConnecting: false,
		}
	},

	/**
	 * Check if two nodes can be connected:
	 * - different IDs
	 * - origin element is either on the left or down side of the destination element
	 * @param {Node} origin - Origin node.
	 * @param {Node} destination - Destination node.
	 * @return {Boolean}
	 */
	canConnect(origin, destination) {
		const originCoords = origin.getCoords()
		const destinationCoords = destination.getCoords()

		return (
			origin.id !== destination.id && 
			originCoords.x <= destinationCoords.x
		)
	},

	/**
	 * Handle when a node is clicked.
	 * @param {Node} node - Clicked Node instance.
	 */
	handleClickNode(node) {
		const selectedNode = this.props.inspectorCurrentElement

		// If no node is being selected yet, this means we obviously can't be connecting nodes right now
		if (selectedNode === null) {
			this.setState({isConnecting: false})
		}

		if (this.state.isConnecting) {
			// This means we're trying to create a new connection
			if (this.canConnect(selectedNode, node)) {
				const newConnection = new Connection(
					uniqid(),
					{type: Node.NAME, id: selectedNode.id},
					{type: Node.NAME, id: node.id}
				)
				
				this.props.addConnection(newConnection)

				this.setState({isConnecting: false})
				this.inspectElement(newConnection)
			} else {
				this.inspectElement(null)
			}
		} else {
			// This means no node has been selected so far
			if (this.props.editor.currentAction === EDITOR_ACTION_ADD_CONNECTION) {
				this.setState({isConnecting: true})
			}
			
			this.inspectElement(node)
		}
	},

	/**
	 * Handle when a connection is clicked.
	 * @param {Connection} connection - Clicked Connection instance.
	 */
	handleClickConnection(connection) {
		const selectedNode = this.props.inspectorCurrentElement

		if (this.state.isConnecting) {
			// TODO: add more verifications before adding the connection
			const newConnection = new Connection(
				uniqid(),
				{type: Node.NAME, id: selectedNode.id}, 
				{type: Connection.NAME, id: connection.id}
			)

			this.props.addConnection(newConnection)

			this.setState({isConnecting: false})
		} else {
			this.inspectElement(connection)
		}
	},

	/**
	 * Handle when we need to save a temporary node.
	 * @param {Node} node - The Node instance to edit.
	 */
	handleSaveNode(node) {
		const {
			editNode,
			setInspectorCurrentElement,
			nodes,
		} = this.props

		const originalNodeIndex = _.findIndex(nodes, node)

		node.setTemporary(false)

		editNode(originalNodeIndex, node)
		setInspectorCurrentElement(node)
	},

	/**
	 * Handle the graph export.
	 */
	handleExport() {
		// TODO: This method needs to be done again since now a graph is
		// more than a list of connections, labels and nodes.
		const {
			connections, 
			labels, 
			nodes,
		} = this.props

		const exportation = {
			connections,
			labels,
			nodes,
		}
		
		return JSON.stringify(exportation)
	},

	/**
	 * Handle a graph import.
	 */
	handleImport(json) {
		// TODO: As same as the .handleExport method, this one has to be
		// done again as well.
		const parsed = JSON.parse(json)
		
		const {
			connections, 
			labels, 
			nodes,
		} = parsed

		this.setState({connections, labels, nodes})
	},

	/**
	 * Inspect the given element.
	 * @param {Mixed} element - The element instance to inspect.
	 */
	inspectElement(element) {
		this.props.setInspectorCurrentElement(element)
	},

	renderNode(node, key) {
		const x = (node.coords.x * NODE_MARGIN)
		const y = (node.coords.y * NODE_MARGIN)

		// These additional component props creates a stroke when the node is currently selected
		const additionalProps = (_.isEqual(node, this.props.inspectorCurrentElement)) ? {
			strokeWidth: 3,
			stroke: '#555',
		} : {}

		// We set the fill color according to the node type
		let fill = App.NODE_FILL_COLOR_NORMAL

		if (node.isTemporary()) {
			fill = App.NODE_FILL_COLOR_TEMPORARY
		} else if (node.getItemsType() === Node.ITEMS_TYPE_FORMATIVE) {
			fill = App.NODE_FILL_COLOR_ITEMS_TYPE_FORMATIVE
		}

		return (
			<Group
				key={key}
				x={x}
				y={y}
			>
				<Circle
					// Node
					width={NODE_CIRCLE_RADIUS} 
					height={NODE_CIRCLE_RADIUS}
					fill={fill}
					onClick={node.isTemporary() ? this.handleSaveNode.bind(this, node) : this.handleClickNode.bind(this, node)}
					{...additionalProps}
				/>

				<Text
					// Node's name
					text={node.name}
					offsetX={10}
					offsetY={-30}
				/>
			</Group>
		)
	},

	/**
	 * Calculate coordinates for a given type and element.
	 * @param {String} type - What kind of element we're dealing with (node or connection).
	 * @param {Mixed} element - Associated element instance.
	 * @return {Object{x, y}} Coordinates
	 */
	calculcateCoordinates(type, element) {
		if (type === 'node') {
			// Node
			return {
				x: element.coords.x * NODE_MARGIN,
				y: element.coords.y * NODE_MARGIN,
			}
		} else {
			// Connection
			const {start, end} = this.computeCoordinatesForConnection(element)

			return {
				x: (start.x + end.x) / 2,
				y: (start.y + end.y) / 2,
			}
		}
	},

	/**
	 * Specifically calculate coordinates for a given Connection instance.
	 * We need to retrieve both start and end nodes that the connection represents.
	 * @param {Connection} connection - Connection instance.
	 * @return {Object{start, end}} Coordinates
	 */
	computeCoordinatesForConnection(connection) {
		const startType = connection.start.type
		const startId = connection.start.id

		const endType = connection.end.type
		const endId = connection.end.id

		const startElementsList = getElementsList(this.props, startType)
		const endElementsList = getElementsList(this.props, endType)

		const startElement = findElementById(startElementsList, startId)
		const endElement = findElementById(endElementsList, endId)

		return {
			start: this.calculcateCoordinates(startType, startElement),
			end: this.calculcateCoordinates(endType, endElement),
		}
	},

	renderConnection(connection, key) {
		const additionalProps = (_.isEqual(connection, this.props.inspectorCurrentElement)) ? {
			stroke: '#000',
		} : {}

		const {start, end} = this.computeCoordinatesForConnection(connection)

		return (
			<Arrow
				key={key}
				points={[
					start.x,
					start.y,
					end.x,
					end.y,
				]}
				onClick={this.handleClickConnection.bind(this, connection)}
				stroke="#888"
				strokeWidth={4}
				{...additionalProps}
			/>
		)
	},

	render() {
		const surfaceWidth = window.innerWidth - ElementsList.WIDTH
		const surfaceHeight = window.innerHeight - 60

		const {
			connections,
			nodes,
		} = this.props

		return (
			<div>
				<Navigation />

				<ElementsList />

				<Stage
					width={surfaceWidth} 
					height={surfaceHeight}
					x={CANVAS_MARGIN}
					y={CANVAS_MARGIN}
					style={{marginLeft: ElementsList.WIDTH}}
				>
					<Layer>
						<Grid />

						{nodes.map(this.renderNode)}
						{connections.map(this.renderConnection)}
					</Layer>
				</Stage>

				<Inspector />
			</div>
		)
	}
})

App.NODE_FILL_COLOR_NORMAL = '#ccc'
App.NODE_FILL_COLOR_TEMPORARY = '#eee'
App.NODE_FILL_COLOR_ITEMS_TYPE_FORMATIVE = '#666'

export default connect(mapStateToProps, mapDispatchToProps)(App)
