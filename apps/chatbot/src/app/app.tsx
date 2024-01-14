import styled from 'styled-components';
import '../styles.scss';

import { TextField, SubmitButton, Heading } from '@newssifter/ui';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <section className="bg-slate-600 p-2.5 font-serif left-1">
        testing
      </section>
      <div className="bg-indigo-500 p-2 font-mono">Hello!</div>
      <p className="py-2">Rabbit!</p>
      <Heading></Heading>
      <TextField></TextField>
      <SubmitButton></SubmitButton>
    </StyledApp>
  );
}

export default App;
