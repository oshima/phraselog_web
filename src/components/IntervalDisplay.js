import React from 'react';
import styled from 'styled-components';
import grey from '@material-ui/core/colors/grey';
import Typography from '@material-ui/core/Typography';
import { NOTE_SIZE_PIXELS } from '~/constants';

const SkeletonNote = styled.div`
  width: ${NOTE_SIZE_PIXELS}px;
  height: ${NOTE_SIZE_PIXELS}px;
  border: 2px dotted ${grey[600]};
`;

const Label = styled(Typography)`
  &&& {
    margin-left: 8px;
    color: ${grey[800]};
    user-select: none;
  }
`;

function IntervalDisplay({ value }) {
  return (
    <React.Fragment>
      <SkeletonNote />
      <Label>{value.toFixed(2)} sec</Label>
    </React.Fragment>
  );
}

export default IntervalDisplay;
