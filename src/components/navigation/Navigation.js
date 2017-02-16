import React from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import uniqid from 'uniqid'
import {Label} from '../../elements'
import './Navigation.css'

import {
	setEditorCurrentAction,
	setInspectorCurrentElement,
	addLabel,
} from '../../actions'

import {
	EDITOR_ACTION_INSPECT,
	EDITOR_ACTION_ADD_NODE,
	EDITOR_ACTION_ADD_CONNECTION,
	EDITOR_ACTION_ADD_LABEL,
	// EDITOR_ACTION_EXPORT,
	// EDITOR_ACTION_IMPORT,
} from '../../constants'

const mapStateToProps = (state) => {
	return {
		editor: state.editor,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addLabel: (label) => dispatch(addLabel(label)),
		setEditorCurrentAction: (action) => dispatch(setEditorCurrentAction(action)),
		setInspectorCurrentElement: (element) => dispatch(setInspectorCurrentElement(element)),
	}
}

// Represent the top navigation element.
const Navigation = (props) => {
	const {currentAction} = props.editor

	const {
		addLabel, 
		setEditorCurrentAction,
		setInspectorCurrentElement
	} = props

	const options = [
		{
			name: 'Inspect', 
			value: EDITOR_ACTION_INSPECT
		},
		{
			name: 'Add node', 
			value: EDITOR_ACTION_ADD_NODE
		},
		{
			name: 'Add connection',
			value: EDITOR_ACTION_ADD_CONNECTION
		},
		{
			name: 'Add label', 
			value: EDITOR_ACTION_ADD_LABEL, 
			cb: () => {
				const newLabel = new Label(uniqid(), 'LAB')

				addLabel(newLabel)
				setInspectorCurrentElement(newLabel)
				setEditorCurrentAction(EDITOR_ACTION_INSPECT)
			}
		},
		// {name: 'Export', value: EDITOR_ACTION_EXPORT},
		// {name: 'Import', value: EDITOR_ACTION_IMPORT},
	]

	return (
		<div className="Navigation">
			{options.map(({name, value, cb}, key) => (
				<span
					key={key}
					className={classNames(
						'Navigation__option',
						{'Navigation__option_hovered': (currentAction === value)}
					)}
					onClick={(cb && cb.bind(this)) || setEditorCurrentAction.bind(this, value)}
				>
					{name}
				</span> 	
			))}
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)