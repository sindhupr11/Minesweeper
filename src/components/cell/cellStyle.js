import styled, { css } from 'styled-components';
import { CELL_SIZE, CELL_MARGIN, CODES, NUMBER_COLORS } from '../../constants';

export const Button = styled.button`
	width: ${CELL_SIZE}px;
	height: ${CELL_SIZE}px;
	margin: ${CELL_MARGIN}px;
	padding: 0;
	box-sizing: border-box;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 'Consolas', monospace;
	font-weight: 800;
	font-size: ${({ cellCode }) => (cellCode > 0 ? '19px' : '17px')};
	cursor: pointer;
	user-select: none;
	outline: none;
	transition: background 0.1s ease, transform 0.05s ease, box-shadow 0.1s ease;

	/* Color for numbers */
	color: ${({ cellCode }) => {
		if (cellCode > 0 && cellCode <= 8) {
			return NUMBER_COLORS[cellCode] || '#ffffff';
		}
		return '#ffffff';
	}};

	${({ customTheme, cellCode, isRevealed }) => {
		const isRetro = customTheme?.id === 'retro';

		if (isRetro) {
			if (cellCode === CODES.MINE_EXPLODED) {
				return css`
					background: #ff0000;
					border: 1px solid #808080;
				`;
			}
			if (cellCode === CODES.WRONG_FLAG) {
				return css`
					background: #ffa0a0;
					border: 1px solid #808080;
				`;
			}
			if (isRevealed) {
				return css`
					background: #bdbdbd;
					border-top: 1px solid #7b7b7b;
					border-left: 1px solid #7b7b7b;
					border-right: 1px solid #d4d4d4;
					border-bottom: 1px solid #d4d4d4;
				`;
			}
			return css`
				background: #c0c0c0;
				border-top: 2.5px solid #ffffff;
				border-left: 2.5px solid #ffffff;
				border-right: 2.5px solid #808080;
				border-bottom: 2.5px solid #808080;
				&:active {
					border-top: 2.5px solid #808080;
					border-left: 2.5px solid #808080;
					border-right: 2.5px solid #ffffff;
					border-bottom: 2.5px solid #ffffff;
				}
			`;
		}

		// Modern or Light
		const borderRadius = customTheme?.cardRadius === '0px' ? '0px' : '6px';

		if (cellCode === CODES.MINE_EXPLODED) {
			return css`
				background: #ef4444 !important;
				border: 1px solid #b91c1c;
				border-radius: ${borderRadius};
				box-shadow: 0 0 12px rgba(239, 68, 68, 0.8);
				animation: pulse 0.8s infinite alternate;

				@keyframes pulse {
					from { transform: scale(1); }
					to { transform: scale(1.06); }
				}
			`;
		}

		if (cellCode === CODES.WRONG_FLAG) {
			return css`
				background: rgba(244, 63, 94, 0.25);
				border: 1px solid #f43f5e;
				border-radius: ${borderRadius};
			`;
		}

		if (isRevealed) {
			return css`
				background: ${customTheme?.cellRevealedBg || '#0f172a'};
				border: ${customTheme?.cellRevealedBorder || '1px solid #1e293b'};
				border-radius: ${borderRadius};
				box-shadow: ${customTheme?.cellRevealedShadow || 'inset 0 2px 4px rgba(0, 0, 0, 0.5)'};
				cursor: default;
			`;
		}

		return css`
			background: ${customTheme?.cellCoveredBg || 'linear-gradient(145deg, #334155, #1e293b)'};
			border: ${customTheme?.cellCoveredBorder || '1px solid #475569'};
			border-radius: ${borderRadius};
			box-shadow: ${customTheme?.cellCoveredShadow || '0 3px 0 #0f172a, inset 0 1px 0 rgba(255, 255, 255, 0.15)'};

			&:hover {
				background: ${customTheme?.cellCoveredHover || 'linear-gradient(145deg, #3b4d66, #243248)'};
			}

			&:active {
				transform: translateY(2px);
				box-shadow: 0 1px 0 #0f172a;
			}
		`;
	}}
`;
