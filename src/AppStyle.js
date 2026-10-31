import styled, { css } from 'styled-components';

export const Container = styled.div`
	min-height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 24px 16px;
	box-sizing: border-box;
	background: ${({ customTheme }) => customTheme?.bodyBg || '#008080'};
	transition: background 0.3s ease;
`;

export const Wrapper = styled.div`
	box-sizing: border-box;
	max-width: 100%;
	padding: 20px;
	margin: 0 auto;
	transition: all 0.2s ease;

	${({ customTheme }) => {
		const isRetro = customTheme?.id === 'retro';
		if (isRetro) {
			return css`
				background: #c0c0c0;
				border-top: 3px solid #ffffff;
				border-left: 3px solid #ffffff;
				border-right: 3px solid #808080;
				border-bottom: 3px solid #808080;
				box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.4);
			`;
		}
		return css`
			background: ${customTheme?.cardBg || '#c0c0c0'};
			border: ${customTheme?.cardBorder || '2px solid #808080'};
		`;
	}}
`;

export const Header = styled.div`
	text-align: center;
	margin-bottom: 12px;
`;

export const Title = styled.h1`
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
	font-size: 26px;
	font-weight: 800;
	letter-spacing: -0.5px;
	margin: 0;
	color: ${({ customTheme }) => customTheme?.textColor || '#000000'};
	display: flex;
	align-items: center;
	justify-content: center;
	user-select: none;
`;
