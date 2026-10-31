import controlReducer, {
	setCustomGame,
	restartGame,
	openCell,
	rotateCellState,
	toggleFlagMode,
	toggleSound
} from './control';
import { DEFAULT_WIDTH, DEFAULT_HEIGHT, DEFAULT_MINES, GAME, CODES } from '../../constants';

describe('Control Reducer and Actions', () => {
	test('initial state has default 9x9 board with 10 mines and ready state', () => {
		const state = controlReducer(undefined, { type: '@@INIT' });
		expect(state.gameState).toBe(GAME.READY);
		expect(state.width).toBe(DEFAULT_WIDTH);
		expect(state.height).toBe(DEFAULT_HEIGHT);
		expect(state.mineCount).toBe(DEFAULT_MINES);
		expect(state.minesInitialized).toBe(false);
		expect(state.theme).toBe('retro');
	});

	test('setCustomGame updates dimensions and resets board', () => {
		const state = controlReducer(undefined, setCustomGame(12, 12, 20));
		expect(state.width).toBe(12);
		expect(state.height).toBe(12);
		expect(state.mineCount).toBe(20);
		expect(state.gameState).toBe(GAME.READY);
	});

	test('openCell initializes mines safely on first click and enters RUN state', () => {
		let state = controlReducer(undefined, { type: '@@INIT' });
		expect(state.minesInitialized).toBe(false);

		state = controlReducer(state, openCell(0, 0));
		expect(state.minesInitialized).toBe(true);
		expect(state.gameState).toBe(GAME.RUN);
		expect(state.openedCellCount).toBeGreaterThan(0);
		// Clicked cell must be revealed
		expect(state.boardData[0][0]).toBeGreaterThanOrEqual(0);
	});

	test('flagMode redirects openCell to flag placement', () => {
		let state = controlReducer(undefined, { type: '@@INIT' });
		state = controlReducer(state, toggleFlagMode());
		expect(state.flagMode).toBe(true);

		state = controlReducer(state, openCell(1, 1));
		expect(state.boardData[1][1]).toBe(CODES.FLAG);
		expect(state.flagCount).toBe(1);
	});

	test('rotateCellState rotates flag state', () => {
		let state = controlReducer(undefined, { type: '@@INIT' });
		state = controlReducer(state, rotateCellState(2, 2));
		expect(state.boardData[2][2]).toBe(CODES.FLAG);
		expect(state.flagCount).toBe(1);

		state = controlReducer(state, rotateCellState(2, 2));
		expect(state.boardData[2][2]).toBe(CODES.QUESTION);
		expect(state.flagCount).toBe(0);
	});

	test('toggleSound toggles sound state', () => {
		const state1 = controlReducer(undefined, { type: '@@INIT' });
		const state2 = controlReducer(state1, toggleSound());
		expect(state2.soundMuted).toBe(!state1.soundMuted);
	});
});
