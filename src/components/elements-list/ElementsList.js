import React, {createClass} from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import _ from 'underscore'
// import Dragula from 'react-dragula'
import {setInspectorCurrentElement} from '../../actions'

import {
	getNameForConnectionElement,
	findElement,
} from '../../utils'

import './ElementsList.css'

const mapStateToProps = (state) => {
	return {
		connections: state.connections,
		labels: state.labels,
		nodes: state.nodes,
		inspector: state.inspector,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setInspectorCurrentElement: (element) => dispatch(setInspectorCurrentElement(element)),
	}
}

const ElementsList = createClass({
	// dragulaDecorator(componentBackingInstance) {
	// 	if (componentBackingInstance) {
	// 		let options = { };
	// 		Dragula([componentBackingInstance], options);
	// 	}
	// },

	renderConnection(connection, key) {
		const store = this.props

		return (
			<div
				key={key}
				className={classNames(
					'ElementsList__element', 
					{'ElementsList__element_hovered': (this.props.inspector.currentElement === connection)}
				)}
				onClick={this.props.setInspectorCurrentElement.bind(this, connection)}
			>
				{getNameForConnectionElement(store, connection.start)}
				&nbsp;->&nbsp;
				{getNameForConnectionElement(store, connection.end)}
			</div>
		)
	},

	renderLabel(label, key) {
		return (
			<div
				key={key}
				className={classNames(
					'ElementsList__element', 
					{'ElementsList__element_hovered': (this.props.inspector.currentElement === label)},
					'label',
				)}
				onClick={this.props.setInspectorCurrentElement.bind(this, label)}
			>
				{getNameForConnectionElement(this.props, label)}
			</div>
		)
	},

	renderNode(node, key) {
		if (node.isTemporary()) {
			return
		}

		const labels = node.getLabels()
		const hasLabels = (labels.length > 0)

		return (
			<div
				key={key}
				className={classNames(
					'ElementsList__element', 
					{'ElementsList__element_hovered': (this.props.inspector.currentElement === node)}
				)}
				onClick={this.props.setInspectorCurrentElement.bind(this, node)}
			>
				{node.getName()}

				{hasLabels ? (
					<ul>
						{
							labels
							.map((label) => findElement(this.props, {id: label, type: 'label'}))
							.map((label, key) => (
								<li key={key}>
									{this.renderLabel(label, key)}
								</li>
							))
						}
					</ul>
				) : null}
			</div>
		)
	},

	render() {
		return (
			<div 
				className="ElementsList" 
				// ref={this.dragulaDecorator}
			>
				<div className="ElementsList__category">
					Constructs
				</div>

				{this.props.nodes.map(this.renderNode)}

				<div className="ElementsList__category">
					Connections
				</div>

				{this.props.connections.map(this.renderConnection)}

				<div className="ElementsList__category">
					Labels
				</div>

				{this.props.labels.map(this.renderLabel)}
			</div>
		)
	}
})

ElementsList.WIDTH = 200

export default connect(mapStateToProps, mapDispatchToProps)(ElementsList)