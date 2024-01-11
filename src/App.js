import React from 'react';
import { SettingsContainer,	StatusContainer, BoardContainer } from './containers';
import { Container, Wrapper, Title } from './AppStyle';

function App() {
  return (
    <Container>
      <Wrapper>
        <Title>Minesweeper</Title>
        <SettingsContainer />
        <StatusContainer />
        <BoardContainer />
      </Wrapper>
    </Container>
    
  );
}

export default App;
