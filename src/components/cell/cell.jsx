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
>>>>>>> d756860 (v1-dev)
	return (
		<Button cellCode={cellCode} onClick={onClickCell} onContextMenu={onRightClickCell}>{cellText}</Button>
	);
};

export default memo(Cell);