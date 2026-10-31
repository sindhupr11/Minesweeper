import React from 'react';
import {
	StatusWrapper,
	MainHeader,
	DigitalDisplay,
	ActionsBar,
	ActionButton
} from './statusStyle';

const Status = ({
	leftMineCount,
	elapsedTime,
	flagMode,
	soundMuted,
	theme,
	onClickRestart,
	onToggleFlagMode,
	onToggleSound,
	onOpenSettings
}) => {
	const formattedMines = String(Math.max(-99, Math.min(999, leftMineCount))).padStart(3, '0');
	const formattedTime = String(Math.min(999, elapsedTime)).padStart(3, '0');

	return (
		<StatusWrapper>
			{/* Main Windows 95 Display: Mine Counter and Timer */}
			<MainHeader theme={theme}>
				<DigitalDisplay theme={theme} title="Remaining mines">
					{formattedMines}
				</DigitalDisplay>

				<DigitalDisplay theme={theme} title="Elapsed time">
					{formattedTime}
				</DigitalDisplay>
			</MainHeader>

			{/* Actions toolbar */}
			<ActionsBar>
				<ActionButton
					theme={theme}
					highlight
					onClick={onClickRestart}
					title="Start a new game"
				>
					New Game
				</ActionButton>

				<ActionButton
					theme={theme}
					active={flagMode}
					onClick={onToggleFlagMode}
					title="Toggle Flag / Dig mode (useful for touchscreens)"
				>
					{flagMode ? 'Flag Mode' : 'Dig Mode'}
				</ActionButton>

				<ActionButton
					theme={theme}
					onClick={onToggleSound}
					title="Toggle sound effects"
				>
					{soundMuted ? 'Muted' : 'Sound'}
				</ActionButton>

				<ActionButton
					theme={theme}
					onClick={onOpenSettings}
					title="Custom Board Settings"
				>
					Custom
				</ActionButton>
			</ActionsBar>
		</StatusWrapper>
	);
};

export default Status;
