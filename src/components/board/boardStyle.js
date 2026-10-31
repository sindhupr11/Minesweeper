import styled, { css } from 'styled-components';
import { CELL_SIZE, CELL_MARGIN } from '../../constants';

export const BoardContainerWrapper = styled.div`
	max-width: 100%;
	overflow-x: auto;
	padding: 8px 4px;
	display: flex;
	justify-content: center;

	/* Custom smooth scrollbar */
	&::-webkit-scrollbar {
		height: 6px;
	}
	&::-webkit-scrollbar-track {
		background: rgba(0, 0, 0, 0.1);
		border-radius: 3px;
	}
	&::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.2);
		border-radius: 3px;
	}
`;

export const Grid = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: ${({ widthSize }) => widthSize * (CELL_SIZE + CELL_MARGIN * 2)}px;
	min-width: ${({ widthSize }) => widthSize * (CELL_SIZE + CELL_MARGIN * 2)}px;
	margin: 0 auto;
	padding: 6px;
	box-sizing: content-box;

	${({ customTheme }) => {
		const isRetro = customTheme?.id === 'retro';
		if (isRetro) {
			return css`
				background: #808080;
				border-top: 3px solid #808080;
				border-left: 3px solid #808080;
				border-right: 3px solid #ffffff;
				border-bottom: 3px solid #ffffff;
			`;
		}
		return css`
			background: ${customTheme?.panelBg || 'rgba(15, 23, 42, 0.6)'};
			border: ${customTheme?.panelBorder || '1px solid rgba(255, 255, 255, 0.08)'};
			border-radius: ${customTheme?.cardRadius === '0px' ? '0px' : '12px'};
		`;
	}}
`;
