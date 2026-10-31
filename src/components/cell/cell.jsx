import React, { memo } from 'react';
import { Button } from './cellStyle';
import { GAME, CODES } from '../../constants';

const Cell = ({
	cellCode,
	cellText,
	gameState,
	theme,
	onClickCell,
	onDoubleClickCell,
	onRightClickCell
}) => {
	const isRevealed =
		cellCode >= 0 ||
		cellCode === CODES.MINE_EXPLODED ||
		cellCode === CODES.WRONG_FLAG ||
		(cellCode === CODES.MINE && (gameState === GAME.LOSE || gameState === GAME.WIN));

	return (
		<Button
			cellCode={cellCode}
			isRevealed={isRevealed}
			customTheme={theme}
			onClick={onClickCell}
			onDoubleClick={onDoubleClickCell}
			onContextMenu={onRightClickCell}
			aria-label={isRevealed ? `Revealed cell with ${cellText || '0 mines'}` : 'Hidden cell'}
		>
			{cellText}
		</Button>
	);
};

export default memo(Cell);
