import React from 'react';
import { Wrapper, Mine,	ButtonWrapper, RestartButton, SettingsButton, Timer } from './statusStyle';

<<<<<<< HEAD
const Status = ({ leftMineCount, mineCount, resultEmoji, enableSettings, elapsedTime, onClickRestart, onClickSettings }) => {
=======
const Status = ({
	leftMineCount,
	mineCount,
	resultEmoji,
	enableSettings,
	elapsedTime,
	onClickRestart,
	onClickSettings
}) => {
>>>>>>> d756860 (v1-dev)
	return (
		<Wrapper>
			<Mine>💣 {leftMineCount} / {mineCount}</Mine>
			<ButtonWrapper>
				<RestartButton title="Restart" onClick={onClickRestart}>{resultEmoji}</RestartButton>
				{enableSettings && <SettingsButton title="Settings" onClick={onClickSettings}>⚙️</SettingsButton>}
			</ButtonWrapper>
			<Timer>🕙 {elapsedTime}</Timer>
		</Wrapper>
	);
};

export default Status;