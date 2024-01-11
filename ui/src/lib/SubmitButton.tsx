import styled from 'styled-components';

/* eslint-disable-next-line */
export interface FormFieldProps {}

const StyledFormField = styled.div`
  color: blue;
`;

export function SubmitButton(props: FormFieldProps) {
  return (
    <StyledFormField>
      <button type="button" name="start" id="start">
        Tell Me!
      </button>
    </StyledFormField>
  );
}

export default SubmitButton;
