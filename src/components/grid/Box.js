import React, {createClass} from 'react'
import {connect} from 'react-redux'
import uniqid from 'uniqid'
import _ from 'underscore'

import {
	Group, 
	Rect, 
	Line,
	Text,
} from 'react-konva'

import {
	EDITOR_ACTION_ADD_NODE,
	NODE_MARGIN,
	NODE_CIRCLE_RADIUS,
	CANVAS_MARGIN,
} from '../../constants'

import {
	addNode, 
	editNode,
	removeNode,
} from '../../actions'

import {Node} from '../../elements'

// Represent every coordinate box.
const side = NODE_MARGIN
let temporaryNode, x, y = null

const mapStateToProps = (state) => {
	return {
		columns: state.columns,
		editor: state.editor,
		nodes: state.nodes,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addNode: (node) => dispatch(addNode(node)),
		editNode: (index, node) => dispatch(editNode(index, node)),
		removeNode: (node) => dispatch(removeNode(node)),
	}
}

// Represent every "box" of the grid.
const Box = createClass({
	componentDidUpdate() {
		if (temporaryNode !== null) {
			// If the editor current action isn't 'add-node', we try to remove the temporary node
			if (this.props.editor.currentAction !== EDITOR_ACTION_ADD_NODE) {
				this.props.removeNode(temporaryNode)
				temporaryNode = null
			}
		}
	},

	/**
	 * Handle when the box is hovered.
	 * @param {Event} event - Event instance.
	 */
	handleHovering(event) {
		const mouseEvent = event.evt
		let {offsetX, offsetY} = mouseEvent
		const canvasOffsetToSubstract = NODE_CIRCLE_RADIUS + (CANVAS_MARGIN / 2)

		offsetX -= canvasOffsetToSubstract
		offsetY -= canvasOffsetToSubstract

		offsetX %= side
		offsetY %= side

		x = this.props.x
		y = this.props.y

		const containerMiddlePoint = side / 2

		if (offsetY <= containerMiddlePoint) {
			// Upper part
			if (offsetX > containerMiddlePoint) {
				// Upper right
				x += 1
			}
		} else {
			// Lower part
			if (offsetX <= containerMiddlePoint) {
				// Lower left
				y += 1
			} else {
				// Lower right
				x += 1
				y += 1
			}
		}

		// Check if there's already another node at this position
		const {nodes} = this.props
		
		for (let node of nodes) {
			const coords = node.getCoords()

			if (coords.x === x && coords.y === y) {
				return
			}
		}

		if (temporaryNode) {
			const nodeCoords = temporaryNode.getCoords()
			const coordX = nodeCoords.x
			const coordY = nodeCoords.y

			// The node might have been updated since its creation
			const updatedNode = _.findWhere(this.props.nodes, {id: temporaryNode.id})

			if (!updatedNode.isTemporary()) {
				temporaryNode = null
				return
			} else {
				// If the new guess has new coordinates than the previous one
				if (x !== coordX || y !== coordY) {
					const originalNodeIndex = _.findIndex(this.props.nodes, updatedNode)
					updatedNode.setCoords(x, y)
					this.props.editNode(originalNodeIndex, updatedNode)
					return
				} else {
					this.props.removeNode(temporaryNode)
				}
			}
		}
		
		temporaryNode = new Node(uniqid(), x, y, '?')
		temporaryNode.setTemporary(true)

		this.props.addNode(temporaryNode)
	},

	render() {
		const {x, y, columns} = this.props

		return (
			<Group>
				{(x < columns.length) ? (
					<Text
						// Column's name
						text={columns[x].getName()}
						offsetY={(NODE_CIRCLE_RADIUS / 2 + 15)}
						offsetX={NODE_CIRCLE_RADIUS / 2}
						x={NODE_MARGIN * x}
						y={0}
					/>
				) : null}

				<Line
					// Left vertical line
					points={[
						x * side,
						y * side,
						x * side,
						(y + 1) * side
					]}
					stroke="#eee"
				/>

				<Line
					// Right vertical line
					points={[
						(x + 1) * side,
						y * side,
						(x + 1) * side,
						(y + 1) * side
					]}
					stroke="#eee"
				/>

				<Rect
					// Hovering zone only (as we don't want four sides/lines but only two)
					x={x * side}
					y={y * side}
					width={side}
					height={side}
					onMouseMove={(this.props.editor.currentAction === EDITOR_ACTION_ADD_NODE) ? this.handleHovering : (e) => null}
				/>
			</Group>
		)
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Box)