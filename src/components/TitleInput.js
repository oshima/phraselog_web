import styled from 'styled-components';
import Input from '@material-ui/core/Input';

const TitleInput = styled(Input).attrs({
  fullWidth: true
})`
  &&& {
    font-family: 'Play', 'Helvetica', 'Arial', sans-serif;
    font-size: 1.0625rem;
    line-height: 1.625rem;
  }
`;

export default TitleInput;
