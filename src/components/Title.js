import styled from 'styled-components';

const Title = styled.span`
  font-family: 'Play', 'Helvetica', 'Arial', sans-serif;
  font-size: 1.0625rem;
  line-height: 1.3125rem;
  color: rgba(0, 0, 0, 0.87);
  font-weight: ${props => (props.bold ? 700 : 400)};
  &:hover {
    text-decoration: ${props => props.underline && 'underline'};
  }
`;

export default Title;
