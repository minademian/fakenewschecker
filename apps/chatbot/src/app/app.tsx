import styled from 'styled-components';

import { TextField, SubmitButton, Heading } from '@newssifter/ui';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <Heading></Heading>
      <TextField></TextField>
      <SubmitButton></SubmitButton>
    </StyledApp>
  );
}

export default App;
