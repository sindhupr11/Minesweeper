import styled from 'styled-components';

export const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.4);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 9999;
	animation: fadeIn 0.15s ease-out;

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}
`;

export const Window = styled.div`
	background: #c0c0c0;
	border-top: 3px solid #ffffff;
	border-left: 3px solid #ffffff;
	border-right: 3px solid #808080;
	border-bottom: 3px solid #808080;
	box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.5);
	width: 90%;
	max-width: 340px;
	box-sizing: border-box;
	animation: popIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);

	@keyframes popIn {
		from { transform: scale(0.9); opacity: 0; }
		to { transform: scale(1); opacity: 1; }
	}
`;

export const TitleBar = styled.div`
	background: linear-gradient(90deg, #000080, #1084d0);
	color: #ffffff;
	padding: 4px 6px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
	font-size: 13px;
	font-weight: 700;
	user-select: none;
`;

export const TitleText = styled.span`
	display: flex;
	align-items: center;
`;

export const CloseTitleButton = styled.button`
	background: #c0c0c0;
	border-top: 1.5px solid #ffffff;
	border-left: 1.5px solid #ffffff;
	border-right: 1.5px solid #808080;
	border-bottom: 1.5px solid #808080;
	width: 18px;
	height: 18px;
	font-size: 11px;
	font-weight: bold;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	padding: 0;
	outline: none;

	&:active {
		border-top: 1.5px solid #808080;
		border-left: 1.5px solid #808080;
		border-right: 1.5px solid #ffffff;
		border-bottom: 1.5px solid #ffffff;
	}
`;

export const Content = styled.div`
	padding: 24px 16px 20px 16px;
	text-align: center;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
	color: #000000;
`;

export const Message = styled.h3`
	font-size: 17px;
	font-weight: 700;
	margin: 0 0 10px 0;
	color: #000000;
`;

export const TimeText = styled.div`
	font-size: 14px;
	font-weight: 500;
	color: #222222;
	margin-bottom: 20px;
`;

export const ButtonRow = styled.div`
	display: flex;
	justify-content: center;
	gap: 12px;
`;

export const RetroButton = styled.button`
	background: #c0c0c0;
	border-top: 2.5px solid #ffffff;
	border-left: 2.5px solid #ffffff;
	border-right: 2.5px solid #808080;
	border-bottom: 2.5px solid #808080;
	padding: 6px 18px;
	font-size: 13px;
	font-weight: 700;
	cursor: pointer;
	outline: none;
	min-width: 90px;

	&:hover {
		background: #d4d4d4;
	}

	&:active {
		border-top: 2.5px solid #808080;
		border-left: 2.5px solid #808080;
		border-right: 2.5px solid #ffffff;
		border-bottom: 2.5px solid #ffffff;
	}
`;
