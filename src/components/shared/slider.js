import styled, { css } from 'styled-components';

const thumbCSS = css`
	background: #38bdf8;
	border: 2px solid #ffffff;
	border-radius: 50%;
	width: 18px;
	height: 18px;
	cursor: pointer;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
	transition: transform 0.1s ease;

	&:hover {
		transform: scale(1.15);
	}
`;

const Slider = styled.input.attrs({
	type: 'range'
})`
	width: 100%;
	height: 8px;
	background: rgba(255, 255, 255, 0.15);
	border-radius: 4px;
	outline: none;
	-webkit-appearance: none;
	margin: 8px 0 4px 0;

	&::-webkit-slider-thumb {
		${thumbCSS};
		-webkit-appearance: none;
	}
	&::-moz-range-thumb {
		${thumbCSS};
	}
	&::-ms-thumb {
		${thumbCSS};
	}
`;

export default Slider;
