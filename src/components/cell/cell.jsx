import React, { memo } from 'react';
import { Button } from './cellStyle';

<<<<<<< HEAD
const Cell = ({ cellCode, cellText,	onClickCell, onRightClickCell }) => {
=======
const Cell = ({
	cellCode,
	cellText,
	onClickCell,
	onRightClickCell
}) => {
>>>>>>> d756860d9e20ac6c79c768b6bfdd68c2d195c1f8
	return (
		<Button cellCode={cellCode} onClick={onClickCell} onContextMenu={onRightClickCell}>{cellText}</Button>
	);
};

export default memo(Cell);