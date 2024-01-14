import styled from 'styled-components';

/* eslint-disable-next-line */
export interface HeadingProps {}

const StyledHeading = styled.div`
  color: blue;
`;

export function Heading(props: HeadingProps) {
  return (
    <StyledHeading>
      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
        News Sifter
      </h1>
    </StyledHeading>
  );
}

export default Heading;
