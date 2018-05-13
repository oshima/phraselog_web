import React from 'react';
import grey from 'material-ui/colors/grey';
import lime from 'material-ui/colors/lime';
import { NOTE_SIZE_PIXELS } from '~/constants';

function Progress({ x, playing, ...others }) {
  return (
    <rect
      x={x * NOTE_SIZE_PIXELS}
      y={0}
      width={NOTE_SIZE_PIXELS}
      height={NOTE_SIZE_PIXELS}
      fill={playing ? lime[600] : grey[500]}
      {...others}
    />
  );
}

export default Progress;
