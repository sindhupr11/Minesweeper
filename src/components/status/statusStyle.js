import styled, { css } from 'styled-components';

export const StatusWrapper = styled.div`
	margin-bottom: 12px;
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const MainHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 8px 12px;
	box-sizing: border-box;

	${({ theme }) => {
		const isRetro = theme?.id === 'retro';
		if (isRetro) {
			return css`
				background: #c0c0c0;
				border-top: 3px solid #808080;
				border-left: 3px solid #808080;
				border-right: 3px solid #ffffff;
				border-bottom: 3px solid #ffffff;
			`;
		}
		return css`
			background: ${theme?.panelBg || '#c0c0c0'};
			border: ${theme?.panelBorder || '2px solid #808080'};
		`;
	}}
`;

export const DigitalDisplay = styled.div`
	font-family: 'Courier New', Courier, monospace;
	font-size: 28px;
	font-weight: 900;
	letter-spacing: 2px;
	min-width: 70px;
	text-align: center;
	padding: 4px 6px;
	background: #000000;
	color: #ff0000;
	border: 2px inset #808080;
	text-shadow: 0 0 4px #ff0000;
	user-select: none;
	box-sizing: border-box;
`;

export const ActionsBar = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 6px;
	width: 100%;
	box-sizing: border-box;
`;

export const ActionButton = styled.button`
	background: ${({ active, highlight }) => {
		if (active) return '#a0a0a0';
		if (highlight) return '#d4d4d4';
		return '#c0c0c0';
	}};
	color: ${({ active }) => {
		if (active) return '#800000';
		return '#000000';
	}};
	border-top: ${({ active }) => (active ? '2.5px solid #808080' : '2.5px solid #ffffff')};
	border-left: ${({ active }) => (active ? '2.5px solid #808080' : '2.5px solid #ffffff')};
	border-right: ${({ active }) => (active ? '2.5px solid #ffffff' : '2.5px solid #808080')};
	border-bottom: ${({ active }) => (active ? '2.5px solid #ffffff' : '2.5px solid #808080')};
	padding: 7px 4px;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
	font-size: 13px;
	font-weight: 700;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	white-space: nowrap;
	outline: none;
	box-sizing: border-box;
	width: 100%;
	transition: background-color 0.1s ease;

	&:hover {
		background: #dcdcdc;
	}

	&:active {
		border-top: 2.5px solid #808080;
		border-left: 2.5px solid #808080;
		border-right: 2.5px solid #ffffff;
		border-bottom: 2.5px solid #ffffff;
	}
`;
