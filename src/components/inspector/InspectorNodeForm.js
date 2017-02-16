import React, {createClass} from 'react'
import _ from 'underscore'
import {connect} from 'react-redux'
import {Node} from '../../elements'

import {
	editNode,
	removeNode,
	setInspectorCurrentElement,
	removeConnection,
} from '../../actions'

const mapStateToProps = (state) => {
	return {
		nodes: state.nodes,
		connections: state.connections,
		labels: state.labels,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		editNode: (index, node) => dispatch(editNode(index, node)),
		removeNode: (node) => dispatch(removeNode(node)),
		setInspectorCurrentElement: (element) => dispatch(setInspectorCurrentElement(element)),
		removeConnection: (connection) => dispatch(removeConnection(connection)),
	}
}

// Represent the inspector's node form (when a node is inspected).
const InspectorNodeForm = createClass({
	/**
	 * Handle each node's name modification.
	 * @param {Event} event - Event instance.
	 */
	handleNameChange(event) {
		const {nodes, node} = this.props
		const nodeName = event.target.value
		const nodeOriginalIndex = _.findIndex(nodes, node)

		node.setName(nodeName)

		this.props.editNode(nodeOriginalIndex, node)
	},

	/**
	 * Handle when the given node is removed.
	 * @param {Event} event - Event instance.
	 */ 
	handleRemoveNode(event) {
		const {connections, node} = this.props

		for (let connection of connections) {
			if (connection.start.id === node.id || connection.end.id === node.id) {
				this.props.removeConnection(connection)
			}
		}

		this.props.removeNode(node)
		this.props.setInspectorCurrentElement(null)
	},

	/**
	 * Handle when the items' type has been changed.
	 * @param {Event} event - Event instance.
	 */
	handleItemsTypeChange(event) {
		const {nodes, node} = this.props
		const nodeItemsType = event.target.value
		const nodeOriginalIndex = _.findIndex(nodes, node)

		node.setItemsType(nodeItemsType)

		this.props.editNode(nodeOriginalIndex, node)
	},

	/**
	 * Handle when a node's label is being removed.
	 * @param {Label} label - Label instance to remove.
	 */
	handleRemoveLabel(label) {
		const {
			node, 
			nodes
		} = this.props

		const nodeOriginalIndex = _.findIndex(nodes, node)
		const nodeLabels = node.getLabels()
		const labelIndex = nodeLabels.indexOf(label.id)
		
		nodeLabels.splice(labelIndex, 1)
		
		node.setLabels(nodeLabels)

		this.props.editNode(nodeOriginalIndex, node)
	},

	renderLabel(labelID, key) {
		const {labels} = this.props
		const label = _.findWhere(labels, {id: labelID})

		return (
			<li key={key}>
				{label.name}

				<button onClick={this.handleRemoveLabel.bind(this, label)}>
					X
				</button>
			</li>
		)
	},

	render() {
		const {node} = this.props

		const constructItemsType = [
			{name: 'Reflective', value: Node.ITEMS_TYPE_REFLECTIVE}, 
			{name: 'Formative', value: Node.ITEMS_TYPE_FORMATIVE},
		]

		const nodeLabels = node.getLabels()

		return (
			<div>
				<h1>
					Node '{node.name}'
				</h1>

				<input 
					type="text" 
					onChange={this.handleNameChange}
					value={node.name}
					placeholder="Name"
					autoFocus
				/>

				<h2>Construct items type</h2>

				{constructItemsType.map(({name, value}, key) => (
					<div key={key}>
						<input 
							type="radio"
							name="node-type"
							value={value}
							checked={node.itemsType === value}
							onChange={this.handleItemsTypeChange}
						/>

						{name}
					</div>
				))}

				<h2>Labels</h2>

				{(nodeLabels.length > 0) ? (
					<ul>
						{nodeLabels.map(this.renderLabel)}
					</ul>
				) : (
					<div>
						No label yet.
					</div>
				)}

				<button onClick={this.handleRemoveNode}>
					Remove node
				</button>
			</div>
		)
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(InspectorNodeForm)