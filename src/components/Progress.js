import React from 'react';
import grey from '@material-ui/core/colors/grey';
import lime from '@material-ui/core/colors/lime';
import { NOTE_SIZE } from '~/constants';

function Progress({ x, playing, ...others }) {
  return (
    <rect
      x={x * NOTE_SIZE}
      y={0}
      width={NOTE_SIZE}
      height={NOTE_SIZE}
      fill={playing ? lime[600] : grey[500]}
      {...others}
    />
  );
}

export default Progress;
