import React, {createClass} from 'react'
import _ from 'underscore'
import {connect} from 'react-redux'

import {
	editLabel,
	removeLabel,
	setInspectorCurrentElement,
} from '../../actions'

const mapStateToProps = (state) => {
	return {
		labels: state.labels,
		nodes: state.nodes,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		editLabel: (index, label) => dispatch(editLabel(index, label)),
		removeLabel: (label) => dispatch(removeLabel(label)),
		setInspectorCurrentElement: (element) => dispatch(setInspectorCurrentElement(element)),
	}
}

// Represent the inspector's label form (when a label is inspected).
const InspectorLabelForm = createClass({
	/**
	 * Handle each label's name modification.
	 * @param {Event} event - Event instance.
	 */
	handleChange(event) {
		let {label, labels} = this.props

		const labelName = event.target.value
		const labelOriginalIndex = _.findIndex(labels, label)

		label.setName(labelName)

		this.props.editLabel(labelOriginalIndex, label)
	},

	/**
	 * Handle when the given label is removed.
	 * @param {Event} event - Event instance.
	 */ 
	handleRemoveLabel(event) {
		const {label, nodes} = this.props
		const relatedNodes = nodes.filter((node) => node.getLabels().indexOf(label.id) !== -1)

		for (let node of relatedNodes) {
			const nodeLabels = node.getLabels()
			const labelIndex = nodeLabels.indexOf(label.id)
			
			nodeLabels.splice(labelIndex, 1)
			
			node.setLabels(nodeLabels)
		}

		this.props.removeLabel(label)
		this.props.setInspectorCurrentElement(null)
	},

	render() {
		const {label} = this.props

		return (
			<div>
				<p>
					Label '{label.name}'
				</p>

				<input 
					type="text" 
					onChange={this.handleChange}
					value={label.name}
					placeholder="Name"
					autoFocus
				/>

				<button onClick={this.handleRemoveLabel}>
					Remove label
				</button>
			</div>
		)
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(InspectorLabelForm)