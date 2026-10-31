import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Board } from '../../components';
import { THEMES } from '../../styles/theme';

const BoardContainer = () => {
	const enableSettings = useSelector(rootState => rootState.control.enableSettings);
	const width = useSelector(rootState => rootState.control.width);
	const height = useSelector(rootState => rootState.control.height);
	const currentThemeName = useSelector(rootState => rootState.control.theme);
	const theme = THEMES[currentThemeName] || THEMES.modern;

	const onRightClickBoard = useCallback((e) => {
		e.preventDefault();
	}, []);

	if (enableSettings) return null;

	return (
		<Board
			width={width}
			height={height}
			theme={theme}
			onRightClickBoard={onRightClickBoard}
		/>
	);
};

export default BoardContainer;
