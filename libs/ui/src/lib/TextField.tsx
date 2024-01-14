import styled from 'styled-components';

/* eslint-disable-next-line */
export interface TextFieldProps {}

const StyledTextField = styled.div`
  color: black;
`;

export function TextField(props: TextFieldProps) {
  return (
    <StyledTextField>
      <label>
        Submit a link to start a conversation about this article!
        <input type="text" name="article" id="article" />
      </label>
    </StyledTextField>
  );
}

export default TextField;
