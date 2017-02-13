import React from 'react'
import ReactDOM from 'react-dom'
import {Application} from './App'
import './index.css'

import {Provider} from 'react-redux'
import {createStore} from 'redux'
import app from './reducers'

const store = createStore(app)

ReactDOM.render(
	<Provider store={store}>
		<Application />
	</Provider>,
	document.getElementById('root')
)
