import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MIN_WIDTH, MIN_HEIGHT, MIN_MINES } from '../../constants';
import { hideSettings, setCustomGame } from '../../store/modules/control';
import { Settings } from '../../components';
import { THEMES } from '../../styles/theme';

const SettingsContainer = () => {
 	const dispatch = useDispatch();
 	const enableSettings = useSelector(rootState => rootState.control.enableSettings);
 	const currentWidth = useSelector(rootState => rootState.control.width);
 	const currentHeight = useSelector(rootState => rootState.control.height);
 	const currentMineCount = useSelector(rootState => rootState.control.mineCount);
 	const theme = THEMES.retro;

 	const [width, setWidth] = useState(currentWidth || MIN_WIDTH);
 	const [height, setHeight] = useState(currentHeight || MIN_HEIGHT);
 	const [mineCount, setMineCount] = useState(currentMineCount || MIN_MINES);

 	useEffect(() => {
 		if (enableSettings) {
 			setWidth(currentWidth);
 			setHeight(currentHeight);
 			setMineCount(currentMineCount);
 		}
 	}, [enableSettings, currentWidth, currentHeight, currentMineCount]);

 	useEffect(() => {
 		const maxMineCount = Math.max(1, (width - 1) * (height - 1));
 		if (mineCount > maxMineCount) {
 			setMineCount(maxMineCount);
 		}
 	}, [width, height, mineCount]);

 	const onChangeWidth = useCallback((e) => {
 		setWidth(parseInt(e.target.value, 10));
 	}, []);

 	const onChangeHeight = useCallback((e) => {
 		setHeight(parseInt(e.target.value, 10));
 	}, []);

 	const onChangeMines = useCallback((e) => {
 		setMineCount(parseInt(e.target.value, 10));
 	}, []);

 	const onClickSet = useCallback(() => {
 		dispatch(setCustomGame(width, height, mineCount));
 	}, [dispatch, width, height, mineCount]);

 	const onClickCancel = useCallback(() => {
 		dispatch(hideSettings());
 	}, [dispatch]);

 	if (!enableSettings) return null;

 	return (
 		<Settings
 			width={width}
 			height={height}
 			mineCount={mineCount}
 			maxMineCount={Math.max(1, (width - 1) * (height - 1))}
 			theme={theme}
 			onChangeWidth={onChangeWidth}
 			onChangeHeight={onChangeHeight}
 			onChangeMines={onChangeMines}
 			onClickSet={onClickSet}
 			onClickCancel={onClickCancel}
 		/>
 	);
 };

export default SettingsContainer;
