import React from 'react'
import {Group} from 'react-konva'
import Box from './Box'
import {GRID_MATRIX_SIZE} from '../../constants'

// Set of all coordinates we'll need:
// [(0, 0), (0, 1), ...]
let coordsList = []

for (let x = 0; x < GRID_MATRIX_SIZE; x++) {
	for (let y = 0; y < GRID_MATRIX_SIZE; y++) {
		coordsList.push({x, y})
	}
}

// Represent the grid itself.
const Grid = (props) => (
	<Group>
		{coordsList.map(({x, y}, key) => 
			<Box
				key={key} 
				x={x} 
				y={y} 
			/>
		)}
	</Group>
)

export default Grid