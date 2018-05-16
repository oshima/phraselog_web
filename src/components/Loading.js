import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = styled(CircularProgress).attrs({
  size: 24
})`
  margin: 12px;
`;

export default Loading;
