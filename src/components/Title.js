import styled from 'styled-components';

const Title = styled.span`
  font-family: 'Play', 'Helvetica', 'Arial', sans-serif;
  font-size: 1.0625rem;
  line-height: 1.625rem;
  color: rgba(0, 0, 0, 0.87);
  overflow: ${props => props.noWrap && 'hidden'};
  white-space: ${props => props.noWrap && 'nowrap'};
  text-overflow: ${props => props.noWrap && 'ellipsis'};
  font-weight: ${props => (props.bold ? 700 : 400)};
  flex: ${props => props.flex && 1};
  &:hover {
    text-decoration: ${props => props.underline && 'underline'};
  }
`;

export default Title;
