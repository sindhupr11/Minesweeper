import { CODES } from '../constants';

/**
 * Initializes a blank board where every cell is NOTHING
 */
export const initBoard = (width, height) => {
	const boardData = [];
	for (let i = 0; i < height; i++) {
		boardData.push(Array(width).fill(CODES.NOTHING));
	}
	return boardData;
};

/**
 * Populates mines on the board guaranteeing that first clicked tile (and its neighbors if possible) is safe
 */
export const populateMinesWithSafeZone = (boardData, width, height, mineCount, safeX, safeY) => {
	const totalCells = width * height;
	const safeIndices = new Set();

	// Add safe center
	safeIndices.add(safeY * width + safeX);

	// Attempt to keep 8 neighbors safe if there is enough room for mines
	const neighbors = [];
	for (let dy = -1; dy <= 1; dy++) {
		for (let dx = -1; dx <= 1; dx++) {
			const nx = safeX + dx;
			const ny = safeY + dy;
			if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
				neighbors.push(ny * width + nx);
			}
		}
	}

	if (totalCells - neighbors.length >= mineCount) {
		neighbors.forEach(idx => safeIndices.add(idx));
	}

	const candidates = [];
	for (let i = 0; i < totalCells; i++) {
		if (!safeIndices.has(i)) {
			candidates.push(i);
		}
	}

	// Shuffle candidates and pick mineCount
	const mineIndices = [];
	while (mineIndices.length < mineCount && candidates.length > 0) {
		const randIndex = Math.floor(Math.random() * candidates.length);
		const chosen = candidates.splice(randIndex, 1)[0];
		mineIndices.push(chosen);
	}

	// Fallback if not enough non-neighbor candidates were available
	if (mineIndices.length < mineCount) {
		const remainingCandidates = [];
		for (let i = 0; i < totalCells; i++) {
			if (i !== safeY * width + safeX && !mineIndices.includes(i)) {
				remainingCandidates.push(i);
			}
		}
		while (mineIndices.length < mineCount && remainingCandidates.length > 0) {
			const randIndex = Math.floor(Math.random() * remainingCandidates.length);
			mineIndices.push(remainingCandidates.splice(randIndex, 1)[0]);
		}
	}

	for (let i = 0; i < mineIndices.length; i++) {
		const x = mineIndices[i] % width;
		const y = Math.floor(mineIndices[i] / width);
		boardData[y][x] = CODES.MINE;
	}

	return boardData;
};

export const isMineCode = (code) => {
	return [
		CODES.MINE,
		CODES.MINE_FLAG,
		CODES.MINE_QUESTION,
		CODES.MINE_EXPLODED
	].includes(code);
};

export const isFlagCode = (code) => {
	return code === CODES.FLAG || code === CODES.MINE_FLAG;
};

export const getNextCellCode = (code) => {
	switch (code) {
		case CODES.NOTHING:
			return CODES.FLAG;
		case CODES.MINE:
			return CODES.MINE_FLAG;
		case CODES.FLAG:
			return CODES.QUESTION;
		case CODES.MINE_FLAG:
			return CODES.MINE_QUESTION;
		case CODES.QUESTION:
			return CODES.NOTHING;
		case CODES.MINE_QUESTION:
			return CODES.MINE;
		default:
			return code;
	}
};

export const getFlagIncDec = (code) => {
	switch (code) {
		case CODES.NOTHING:
		case CODES.MINE:
			return 1;
		case CODES.FLAG:
		case CODES.MINE_FLAG:
			return -1;
		default:
			return 0;
	}
};

export const getAdjacentMineCount = (boardData, x, y) => {
	const height = boardData.length;
	const width = boardData[0].length;
	let count = 0;

	for (let dy = -1; dy <= 1; dy++) {
		for (let dx = -1; dx <= 1; dx++) {
			if (dx === 0 && dy === 0) continue;
			const nx = x + dx;
			const ny = y + dy;
			if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
				if (isMineCode(boardData[ny][nx])) {
					count++;
				}
			}
		}
	}
	return count;
};

export const expandOpenedCell = (boardData, startX, startY) => {
	const height = boardData.length;
	const width = boardData[0].length;
	let openedCellCount = 0;

	const queue = [{ x: startX, y: startY }];

	while (queue.length > 0) {
		const { x, y } = queue.shift();

		if (x < 0 || x >= width || y < 0 || y >= height) continue;
		if (boardData[y][x] !== CODES.NOTHING) continue;

		const mineCount = getAdjacentMineCount(boardData, x, y);
		boardData[y][x] = mineCount;
		openedCellCount++;

		if (mineCount === 0) {
			for (let dy = -1; dy <= 1; dy++) {
				for (let dx = -1; dx <= 1; dx++) {
					if (dx === 0 && dy === 0) continue;
					const nx = x + dx;
					const ny = y + dy;
					if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
						if (boardData[ny][nx] === CODES.NOTHING) {
							queue.push({ x: nx, y: ny });
						}
					}
				}
			}
		}
	}

	return { boardData, openedCellCount };
};

export const chordCell = (boardData, x, y) => {
	const height = boardData.length;
	const width = boardData[0].length;
	const cellValue = boardData[y][x];

	if (cellValue <= 0 || cellValue > 8) {
		return { boardData, openedCellCount: 0, hitMine: false, explodedX: null, explodedY: null };
	}

	// Count adjacent flags
	let flagCount = 0;
	const adjacentNeighbors = [];

	for (let dy = -1; dy <= 1; dy++) {
		for (let dx = -1; dx <= 1; dx++) {
			if (dx === 0 && dy === 0) continue;
			const nx = x + dx;
			const ny = y + dy;
			if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
				adjacentNeighbors.push({ x: nx, y: ny, code: boardData[ny][nx] });
				if (isFlagCode(boardData[ny][nx])) {
					flagCount++;
				}
			}
		}
	}

	if (flagCount !== cellValue) {
		return { boardData, openedCellCount: 0, hitMine: false, explodedX: null, explodedY: null };
	}

	let totalOpened = 0;
	let hitMine = false;
	let explodedX = null;
	let explodedY = null;

	for (const neighbor of adjacentNeighbors) {
		const { x: nx, y: ny, code } = neighbor;
		// If unflagged and is a mine -> explosion
		if (code === CODES.MINE || code === CODES.MINE_QUESTION) {
			hitMine = true;
			explodedX = nx;
			explodedY = ny;
			break;
		}
		// If unflagged and is NOTHING -> expand
		if (code === CODES.NOTHING) {
			const res = expandOpenedCell(boardData, nx, ny);
			totalOpened += res.openedCellCount;
		}
	}

	return { boardData, openedCellCount: totalOpened, hitMine, explodedX, explodedY };
};

export const revealBoardOnLoss = (boardData, explodedX, explodedY) => {
	const height = boardData.length;
	const width = boardData[0].length;

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const code = boardData[y][x];

			if (x === explodedX && y === explodedY) {
				boardData[y][x] = CODES.MINE_EXPLODED;
			} else if (code === CODES.MINE || code === CODES.MINE_QUESTION) {
				// Reveal unflagged mines
				boardData[y][x] = CODES.MINE;
			} else if (code === CODES.FLAG) {
				// Flagged cell that was NOT a mine -> wrong flag
				boardData[y][x] = CODES.WRONG_FLAG;
			}
		}
	}
	return boardData;
};

export const flagAllMinesOnWin = (boardData) => {
	const height = boardData.length;
	const width = boardData[0].length;

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const code = boardData[y][x];
			if (code === CODES.MINE || code === CODES.MINE_QUESTION) {
				boardData[y][x] = CODES.MINE_FLAG;
			}
		}
	}
	return boardData;
};
