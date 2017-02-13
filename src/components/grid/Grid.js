import React from 'react'
import {Group} from 'react-konva'
import Box from './Box'

// Set of all coordinates we'll need:
// [(0, 0), (0, 1), ...]
const matrixSize = 3
let coordsList = []

for (let x = 0; x < matrixSize; x++) {
	for (let y = 0; y < matrixSize; y++) {
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