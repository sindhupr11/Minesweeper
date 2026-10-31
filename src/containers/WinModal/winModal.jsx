import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GAME } from '../../constants';
import { restartGame } from '../../store/modules/control';
import WinModal from '../../components/winModal/winModal';

const WinModalContainer = () => {
	const dispatch = useDispatch();
	const gameState = useSelector(rootState => rootState.control.gameState);
	const elapsedTime = useSelector(rootState => rootState.control.elapsedTime);
	const [dismissed, setDismissed] = useState(false);

	useEffect(() => {
		if (gameState === GAME.READY || gameState === GAME.RUN) {
			setDismissed(false);
		}
	}, [gameState]);

	const onPlayAgain = useCallback(() => {
		dispatch(restartGame());
	}, [dispatch]);

	const onClose = useCallback(() => {
		setDismissed(true);
	}, []);

	if (gameState !== GAME.WIN || dismissed) {
		return null;
	}

	return (
		<WinModal
			elapsedTime={elapsedTime}
			onPlayAgain={onPlayAgain}
			onClose={onClose}
		/>
	);
};

export default WinModalContainer;
