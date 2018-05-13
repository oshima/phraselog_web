import styled from 'styled-components';
import grey from 'material-ui/colors/grey';

const Border = styled.div`
  position: sticky;
  top: 48px;
  height: 20px;
  background-color: ${grey[200]};
  opacity: 0.95;
  z-index: 1;
`;

export default Border;
