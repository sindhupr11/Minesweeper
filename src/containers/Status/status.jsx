import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	showSettings,
	restartGame,
	updateElapsedTime,
	toggleFlagMode,
	toggleSound
} from '../../store/modules/control';
import { Status } from '../../components';
import { THEMES } from '../../styles/theme';

const StatusContainer = () => {
	const dispatch = useDispatch();
	const enableSettings = useSelector(rootState => rootState.control.enableSettings);
	const enableTimer = useSelector(rootState => rootState.control.enableTimer);
	const elapsedTime = useSelector(rootState => rootState.control.elapsedTime);
	const mineCount = useSelector(rootState => rootState.control.mineCount);
	const flagCount = useSelector(rootState => rootState.control.flagCount);
	const flagMode = useSelector(rootState => rootState.control.flagMode);
	const soundMuted = useSelector(rootState => rootState.control.soundMuted);

	const theme = THEMES.retro;

	useEffect(() => {
		let timerId;
		if (enableTimer) {
			timerId = setInterval(() => {
				dispatch(updateElapsedTime());
			}, 1000);
		}
		return () => {
			if (timerId) clearInterval(timerId);
		};
	}, [dispatch, enableTimer]);

	const onClickRestart = useCallback(() => {
		dispatch(restartGame());
	}, [dispatch]);

	const onToggleFlagMode = useCallback(() => {
		dispatch(toggleFlagMode());
	}, [dispatch]);

	const onToggleSound = useCallback(() => {
		dispatch(toggleSound());
	}, [dispatch]);

	const onOpenSettings = useCallback(() => {
		dispatch(showSettings());
	}, [dispatch]);

	if (enableSettings) return null;

	return (
		<Status
			leftMineCount={mineCount - flagCount}
			elapsedTime={elapsedTime}
			flagMode={flagMode}
			soundMuted={soundMuted}
			theme={theme}
			onClickRestart={onClickRestart}
			onToggleFlagMode={onToggleFlagMode}
			onToggleSound={onToggleSound}
			onOpenSettings={onOpenSettings}
		/>
	);
};

export default StatusContainer;
