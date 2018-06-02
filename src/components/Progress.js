import React from 'react';
import grey from '@material-ui/core/colors/grey';
import { NOTE_SIZE } from '~/constants';

function Progress({ x, ...others }) {
  return (
    <rect
      x={x * NOTE_SIZE}
      y={0}
      width={NOTE_SIZE}
      height={NOTE_SIZE}
      fill={grey[500]}
      {...others}
    />
  );
}

export default Progress;
