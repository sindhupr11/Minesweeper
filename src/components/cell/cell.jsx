import React, { memo } from 'react';
import { Button } from './cellStyle';

const Cell = ({ cellCode, cellText,	onClickCell, onRightClickCell }) => {
	return (
		<Button cellCode={cellCode} onClick={onClickCell} onContextMenu={onRightClickCell}>{cellText}</Button>
	);
};

export default memo(Cell);