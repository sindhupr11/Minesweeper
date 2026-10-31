import { produce } from 'immer';
import {
	DEFAULT_WIDTH,
	DEFAULT_HEIGHT,
	DEFAULT_MINES,
	GAME,
	CODES
} from '../../constants';
import {
	initBoard,
	populateMinesWithSafeZone,
	expandOpenedCell,
	chordCell,
	revealBoardOnLoss,
	flagAllMinesOnWin,
	getNextCellCode,
	getFlagIncDec,
	isFlagCode
} from '../../library/minesweeper';
import { playSound, getSoundMuted, setSoundMuted } from '../../library/sound';

// Action Types
const SHOW_SETTINGS = 'control/SHOW_SETTINGS';
const HIDE_SETTINGS = 'control/HIDE_SETTINGS';
const SET_CUSTOM_GAME = 'control/SET_CUSTOM_GAME';
const RESTART_GAME = 'control/RESTART_GAME';
const UPDATE_ELAPSED_TIME = 'control/UPDATE_ELAPSED_TIME';
const OPEN_CELL = 'control/OPEN_CELL';
const ROTATE_CELL_STATE = 'control/ROTATE_CELL_STATE';
const CHORD_CELL = 'control/CHORD_CELL';
const TOGGLE_FLAG_MODE = 'control/TOGGLE_FLAG_MODE';
const TOGGLE_SOUND = 'control/TOGGLE_SOUND';

// Action Creators
export const showSettings = () => ({ type: SHOW_SETTINGS });
export const hideSettings = () => ({ type: HIDE_SETTINGS });
export const setCustomGame = (width, height, mineCount) => ({ type: SET_CUSTOM_GAME, width, height, mineCount });
export const restartGame = () => ({ type: RESTART_GAME });
export const updateElapsedTime = () => ({ type: UPDATE_ELAPSED_TIME });
export const openCell = (x, y) => ({ type: OPEN_CELL, x, y });
export const rotateCellState = (x, y) => ({ type: ROTATE_CELL_STATE, x, y });
export const chordCellAction = (x, y) => ({ type: CHORD_CELL, x, y });
export const toggleFlagMode = () => ({ type: TOGGLE_FLAG_MODE });
export const toggleSound = () => ({ type: TOGGLE_SOUND });

const initialState = {
	enableSettings: false,
	width: DEFAULT_WIDTH,
	height: DEFAULT_HEIGHT,
	mineCount: DEFAULT_MINES,
	flagCount: 0,
	openedCellCount: 0,
	boardData: initBoard(DEFAULT_WIDTH, DEFAULT_HEIGHT),
	minesInitialized: false,
	gameState: GAME.READY,
	enableTimer: false,
	elapsedTime: 0,
	flagMode: false,
	soundMuted: getSoundMuted(),
	theme: 'retro'
};

const controlReducer = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_SETTINGS:
			return produce(state, draft => {
				draft.enableSettings = true;
			});

		case HIDE_SETTINGS:
			return produce(state, draft => {
				draft.enableSettings = false;
			});

		case SET_CUSTOM_GAME:
			return produce(state, draft => {
				draft.width = action.width;
				draft.height = action.height;
				draft.mineCount = action.mineCount;
				draft.boardData = initBoard(action.width, action.height);
				draft.minesInitialized = false;
				draft.gameState = GAME.READY;
				draft.enableTimer = false;
				draft.elapsedTime = 0;
				draft.flagCount = 0;
				draft.openedCellCount = 0;
				draft.enableSettings = false;
			});

		case RESTART_GAME:
			return produce(state, draft => {
				draft.gameState = GAME.READY;
				draft.enableTimer = false;
				draft.elapsedTime = 0;
				draft.boardData = initBoard(state.width, state.height);
				draft.minesInitialized = false;
				draft.flagCount = 0;
				draft.openedCellCount = 0;
			});

		case UPDATE_ELAPSED_TIME:
			if (state.gameState !== GAME.RUN || !state.enableTimer) return state;
			return produce(state, draft => {
				draft.elapsedTime = Math.min(draft.elapsedTime + 1, 999);
			});

		case OPEN_CELL: {
			if (state.gameState !== GAME.READY && state.gameState !== GAME.RUN) {
				return state;
			}

			const currentCode = state.boardData[action.y][action.x];

			// If flag mode is on and cell is unrevealed, redirect to flag toggle
			if (state.flagMode && currentCode < 0) {
				const nextCode = getNextCellCode(currentCode);
				const incDec = getFlagIncDec(currentCode);
				if (isFlagCode(nextCode)) {
					playSound('flag');
				} else {
					playSound('unflag');
				}
				return produce(state, draft => {
					draft.boardData[action.y][action.x] = nextCode;
					draft.flagCount += incDec;
				});
			}

			// Don't open already opened or flagged cells
			if (currentCode >= 0 || isFlagCode(currentCode) || currentCode === CODES.QUESTION || currentCode === CODES.MINE_QUESTION) {
				return state;
			}

			return produce(state, draft => {
				let workingBoard = draft.boardData;

				// Guarantee safe first click: populate mines now if not initialized
				if (!state.minesInitialized) {
					workingBoard = populateMinesWithSafeZone(
						workingBoard,
						state.width,
						state.height,
						state.mineCount,
						action.x,
						action.y
					);
					draft.minesInitialized = true;
				}

				draft.gameState = GAME.RUN;
				draft.enableTimer = true;

				const targetCode = workingBoard[action.y][action.x];

				if (targetCode === CODES.MINE) {
					// Hit a mine -> Game Over
					draft.gameState = GAME.LOSE;
					draft.enableTimer = false;
					draft.boardData = revealBoardOnLoss(workingBoard, action.x, action.y);
					playSound('explode');
				} else {
					// Expand opened area
					const result = expandOpenedCell(workingBoard, action.x, action.y);
					draft.boardData = result.boardData;
					draft.openedCellCount += result.openedCellCount;

					// Win condition check
					const safeCellsTotal = state.width * state.height - state.mineCount;
					if (draft.openedCellCount >= safeCellsTotal) {
						draft.gameState = GAME.WIN;
						draft.enableTimer = false;
						draft.boardData = flagAllMinesOnWin(draft.boardData);
						draft.flagCount = state.mineCount;
						playSound('win');
					} else {
						playSound('click');
					}
				}
			});
		}

		case ROTATE_CELL_STATE: {
			if (state.gameState !== GAME.READY && state.gameState !== GAME.RUN) {
				return state;
			}

			const code = state.boardData[action.y][action.x];
			if (code >= 0) return state; // Already opened

			const nextCode = getNextCellCode(code);
			const incDec = getFlagIncDec(code);

			if (isFlagCode(nextCode)) {
				playSound('flag');
			} else {
				playSound('unflag');
			}

			return produce(state, draft => {
				draft.boardData[action.y][action.x] = nextCode;
				draft.flagCount += incDec;
			});
		}

		case CHORD_CELL: {
			if (state.gameState !== GAME.RUN) return state;

			return produce(state, draft => {
				const result = chordCell(draft.boardData, action.x, action.y);

				if (result.hitMine) {
					draft.gameState = GAME.LOSE;
					draft.enableTimer = false;
					draft.boardData = revealBoardOnLoss(draft.boardData, result.explodedX, result.explodedY);
					playSound('explode');
				} else if (result.openedCellCount > 0) {
					draft.openedCellCount += result.openedCellCount;
					const safeCellsTotal = state.width * state.height - state.mineCount;

					if (draft.openedCellCount >= safeCellsTotal) {
						draft.gameState = GAME.WIN;
						draft.enableTimer = false;
						draft.boardData = flagAllMinesOnWin(draft.boardData);
						draft.flagCount = state.mineCount;
						playSound('win');
					} else {
						playSound('chord');
					}
				}
			});
		}

		case TOGGLE_FLAG_MODE:
			return produce(state, draft => {
				draft.flagMode = !draft.flagMode;
			});

		case TOGGLE_SOUND: {
			const newMuted = !state.soundMuted;
			setSoundMuted(newMuted);
			return produce(state, draft => {
				draft.soundMuted = newMuted;
			});
		}

		default:
			return state;
	}
};

export default controlReducer;
