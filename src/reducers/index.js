import {combineReducers} from 'redux'
import columns from './columns'
import connections from './connections'
import editor from './editor'
import inspector from './inspector'
import labels from './labels'
import nodes from './nodes'

const app = combineReducers({
	columns,
	connections,
	editor,
	inspector,
	labels,
	nodes,
})

export default app