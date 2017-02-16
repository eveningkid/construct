import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import Application from './App'
import app from './reducers'
import './index.css'

const store = createStore(app)

ReactDOM.render(
	<Provider store={store}>
		<Application />
	</Provider>,
	document.getElementById('root')
)
