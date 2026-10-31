import React from 'react';
import { CellContainer } from '../../containers';
import { BoardContainerWrapper, Grid } from './boardStyle';

const Board = ({ width, height, theme, onRightClickBoard }) => {
	return (
		<BoardContainerWrapper>
			<Grid widthSize={width} customTheme={theme} onContextMenu={onRightClickBoard}>
				{Array(width * height).fill().map((_, i) => (
					<CellContainer key={i} x={i % width} y={Math.floor(i / width)} />
				))}
			</Grid>
		</BoardContainerWrapper>
	);
};

export default Board;
