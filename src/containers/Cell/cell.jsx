import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GAME, CODES } from '../../constants';
import { openCell, rotateCellState, chordCellAction } from '../../store/modules/control';
import { Cell } from '../../components';
import { THEMES } from '../../styles/theme';

const CellContainer = ({ x, y }) => {
	const dispatch = useDispatch();
	const gameState = useSelector(rootState => rootState.control.gameState);
	const cellCode = useSelector(rootState => rootState.control.boardData[y][x]);
	const theme = THEMES.retro;

	const getCellText = useCallback((code) => {
		switch (code) {
			case CODES.OPENED:
			case CODES.NOTHING:
				return '';
			case CODES.FLAG:
			case CODES.MINE_FLAG:
				return '🚩';
			case CODES.QUESTION:
			case CODES.MINE_QUESTION:
				return '?';
			case CODES.MINE:
				if (gameState === GAME.LOSE || gameState === GAME.WIN) {
					return '💣';
				}
				return '';
			case CODES.MINE_EXPLODED:
				return '💣';
			case CODES.WRONG_FLAG:
				return 'X';
			default:
				return code > 0 ? code : '';
		}
	}, [gameState]);

	const onClickCell = useCallback(() => {
		if (gameState === GAME.READY || gameState === GAME.RUN) {
			if (cellCode > 0) {
				// Chording when clicking on an opened number cell
				dispatch(chordCellAction(x, y));
			} else {
				dispatch(openCell(x, y));
			}
		}
	}, [dispatch, gameState, cellCode, x, y]);

	const onDoubleClickCell = useCallback(() => {
		if (gameState === GAME.RUN && cellCode > 0) {
			dispatch(chordCellAction(x, y));
		}
	}, [dispatch, gameState, cellCode, x, y]);

	const onRightClickCell = useCallback((e) => {
		e.preventDefault();
		if (gameState === GAME.READY || gameState === GAME.RUN) {
			dispatch(rotateCellState(x, y));
		}
	}, [dispatch, gameState, x, y]);

	return (
		<Cell
			cellCode={cellCode}
			cellText={getCellText(cellCode)}
			gameState={gameState}
			theme={theme}
			onClickCell={onClickCell}
			onDoubleClickCell={onDoubleClickCell}
			onRightClickCell={onRightClickCell}
		/>
	);
};

export default memo(CellContainer);
