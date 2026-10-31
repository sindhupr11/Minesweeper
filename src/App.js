import React from 'react';
import {
	SettingsContainer,
	StatusContainer,
	BoardContainer,
	WinModalContainer
} from './containers';
import { Container, Wrapper, Header, Title } from './AppStyle';
import { THEMES } from './styles/theme';

function App() {
	const theme = THEMES.retro;

	return (
		<Container customTheme={theme}>
			<Wrapper customTheme={theme}>
				<Header>
					<Title customTheme={theme}>Minesweeper</Title>
				</Header>

				<StatusContainer />
				<SettingsContainer />
				<BoardContainer />
				<WinModalContainer />
			</Wrapper>
		</Container>
	);
}

export default App;
