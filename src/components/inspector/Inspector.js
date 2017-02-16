import React, {createClass} from 'react'
import classNames from 'classnames'
import {connect} from 'react-redux'
import './Inspector.css'
import InspectorNodeForm from './InspectorNodeForm'
import InspectorConnectionForm from './InspectorConnectionForm'
import InspectorLabelForm from './InspectorLabelForm'
import {setInspectorCurrentElement} from '../../actions'

const mapStateToProps = (state) => {
	return {
		element: state.inspector.currentElement,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setInspectorCurrentElement: (element) => dispatch(setInspectorCurrentElement(element)),
	}
}

// Represent the inspector (to inspect selected elements).
const Inspector = createClass({
	/**
	 * Hide the inspector.
	 */
	hideInspector() {
		this.props.setInspectorCurrentElement(null)
	},

	render() {
		const {element} = this.props
		let component = null

		if (element) {
			const className = element.constructor.name

			// Look for the corresponding form.
			switch (className) {
				case 'Node':
					component = <InspectorNodeForm node={element} />
					break

				case 'Connection':
					component = <InspectorConnectionForm connection={element} />
					break

				case 'Label':
					component = <InspectorLabelForm label={element} />
					break

				default:
					console.log(className)
			}
		}

		return (
			<div className={classNames(
				'Inspector', 
				{'hidden': !this.props.element}
			)}>
				<div
					className="Inspector__hide"
					onClick={this.hideInspector}
				>
					(close)
				</div>

				{component}
			</div>
		)
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Inspector)