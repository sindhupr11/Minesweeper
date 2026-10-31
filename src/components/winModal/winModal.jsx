import React from 'react';
import {
	Overlay,
	Window,
	TitleBar,
	TitleText,
	CloseTitleButton,
	Content,
	Message,
	TimeText,
	ButtonRow,
	RetroButton
} from './winModalStyle';

const WinModal = ({ elapsedTime, onPlayAgain, onClose }) => {
	return (
		<Overlay onClick={onClose}>
			<Window onClick={(e) => e.stopPropagation()}>
				<TitleBar>
					<TitleText>Game Won</TitleText>
					<CloseTitleButton onClick={onClose} title="Close">✕</CloseTitleButton>
				</TitleBar>

				<Content>
					<Message>Congratulations!</Message>
					<TimeText>You cleared the minefield in <strong>{elapsedTime}</strong> seconds.</TimeText>

					<ButtonRow>
						<RetroButton onClick={onPlayAgain}>
							Play Again
						</RetroButton>
						<RetroButton onClick={onClose}>
							Close
						</RetroButton>
					</ButtonRow>
				</Content>
			</Window>
		</Overlay>
	);
};

export default WinModal;
