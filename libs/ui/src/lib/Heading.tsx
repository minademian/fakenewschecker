import styled from 'styled-components';

/* eslint-disable-next-line */
export interface HeadingProps {}

const StyledHeading = styled.div`
  color: blue;
`;

export function Heading(props: HeadingProps) {
  return (
    <StyledHeading>
      <h1>News Sifter</h1>
    </StyledHeading>
  );
}

export default Heading;
