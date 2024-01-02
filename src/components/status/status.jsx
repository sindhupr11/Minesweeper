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
>>>>>>> d756860d9e20ac6c79c768b6bfdd68c2d195c1f8
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