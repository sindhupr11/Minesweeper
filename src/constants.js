// Game Defaults and Limits
export const DEFAULT_WIDTH = 9;
export const DEFAULT_HEIGHT = 9;
export const DEFAULT_MINES = 10;

export const MIN_WIDTH = 8;
export const MAX_WIDTH = 30;
export const MIN_HEIGHT = 8;
export const MAX_HEIGHT = 24;
export const MIN_MINES = 1;

// Design Settings
export const CELL_SIZE = 36;
export const CELL_MARGIN = 2;

// Game States
export const GAME = {
	READY: 'ready',
	RUN: 'run',
	WIN: 'win',
	LOSE: 'lose'
};

// Cell States
export const CODES = {
	OPENED: 0,
	NOTHING: -1,
	FLAG: -2,
	QUESTION: -3,
	MINE: -4,
	MINE_FLAG: -5,
	MINE_QUESTION: -6,
	MINE_EXPLODED: -7,
	WRONG_FLAG: -8
};

// Number colors for opened cells
export const NUMBER_COLORS = {
	1: '#2563eb', // Blue
	2: '#16a34a', // Green
	3: '#dc2626', // Red
	4: '#7c3aed', // Purple
	5: '#b45309', // Amber / Orange
	6: '#0891b2', // Teal / Cyan
	7: '#be185d', // Pink / Magenta
	8: '#475569'  // Slate / Dark Gray
};
