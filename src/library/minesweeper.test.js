import { CODES } from '../constants';
import {
	initBoard,
	populateMinesWithSafeZone,
	getAdjacentMineCount,
	expandOpenedCell,
	chordCell,
	revealBoardOnLoss,
	flagAllMinesOnWin,
	getNextCellCode
} from './minesweeper';

describe('Minesweeper Library Logic', () => {
	test('initBoard creates empty 2D array of NOTHING', () => {
		const board = initBoard(9, 9);
		expect(board.length).toBe(9);
		expect(board[0].length).toBe(9);
		expect(board.every(row => row.every(cell => cell === CODES.NOTHING))).toBe(true);
	});

	test('populateMinesWithSafeZone places exact mineCount and keeps first click safe', () => {
		const board = initBoard(9, 9);
		const mineCount = 10;
		const safeX = 4;
		const safeY = 4;

		populateMinesWithSafeZone(board, 9, 9, mineCount, safeX, safeY);

		let totalMines = 0;
		for (let y = 0; y < 9; y++) {
			for (let x = 0; x < 9; x++) {
				if (board[y][x] === CODES.MINE) {
					totalMines++;
					// safe center should NEVER be a mine
					expect(x === safeX && y === safeY).toBe(false);
				}
			}
		}
		expect(totalMines).toBe(mineCount);
	});

	test('getAdjacentMineCount accurately counts neighboring mines', () => {
		const board = [
			[CODES.MINE, CODES.NOTHING, CODES.NOTHING],
			[CODES.NOTHING, CODES.NOTHING, CODES.MINE],
			[CODES.NOTHING, CODES.NOTHING, CODES.NOTHING]
		];

		expect(getAdjacentMineCount(board, 1, 1)).toBe(2);
		expect(getAdjacentMineCount(board, 0, 1)).toBe(1);
		expect(getAdjacentMineCount(board, 2, 2)).toBe(1);
		expect(getAdjacentMineCount(board, 0, 2)).toBe(0);
	});

	test('expandOpenedCell expands flood fill for 0-cells', () => {
		const board = [
			[CODES.NOTHING, CODES.NOTHING, CODES.NOTHING],
			[CODES.NOTHING, CODES.NOTHING, CODES.NOTHING],
			[CODES.NOTHING, CODES.NOTHING, CODES.MINE]
		];

		const { boardData, openedCellCount } = expandOpenedCell(board, 0, 0);
		expect(openedCellCount).toBe(8); // all cells except the mine
		expect(boardData[0][0]).toBe(0);
		expect(boardData[1][1]).toBe(1);
		expect(boardData[2][2]).toBe(CODES.MINE);
	});

	test('chordCell expands neighbors when adjacent flags equal cell number', () => {
		const board = [
			[1, CODES.MINE_FLAG, CODES.NOTHING],
			[CODES.NOTHING, CODES.NOTHING, CODES.NOTHING],
			[0, 0, 0]
		];

		const res = chordCell(board, 0, 0);
		expect(res.openedCellCount).toBeGreaterThanOrEqual(1);
		expect(res.hitMine).toBe(false);
	});

	test('chordCell triggers hitMine if player falsely flagged a non-mine and chorded onto a mine', () => {
		const board = [
			[1, CODES.FLAG, CODES.NOTHING],
			[CODES.MINE, CODES.NOTHING, CODES.NOTHING]
		];

		const res = chordCell(board, 0, 0);
		expect(res.hitMine).toBe(true);
		expect(res.explodedX).toBe(0);
		expect(res.explodedY).toBe(1);
	});

	test('revealBoardOnLoss shows exploded mine and wrong flags', () => {
		const board = [
			[CODES.MINE, CODES.FLAG, CODES.NOTHING],
			[CODES.MINE, CODES.MINE_FLAG, CODES.OPENED]
		];

		const revealed = revealBoardOnLoss(board, 0, 0);
		expect(revealed[0][0]).toBe(CODES.MINE_EXPLODED);
		expect(revealed[0][1]).toBe(CODES.WRONG_FLAG); // was not a mine
		expect(revealed[1][0]).toBe(CODES.MINE); // revealed unflagged mine
	});

	test('flagAllMinesOnWin flags remaining mines', () => {
		const board = [
			[CODES.MINE, CODES.OPENED]
		];
		const winBoard = flagAllMinesOnWin(board);
		expect(winBoard[0][0]).toBe(CODES.MINE_FLAG);
	});

	test('getNextCellCode cycles through NOTHING -> FLAG -> QUESTION -> NOTHING', () => {
		expect(getNextCellCode(CODES.NOTHING)).toBe(CODES.FLAG);
		expect(getNextCellCode(CODES.FLAG)).toBe(CODES.QUESTION);
		expect(getNextCellCode(CODES.QUESTION)).toBe(CODES.NOTHING);
	});
});
