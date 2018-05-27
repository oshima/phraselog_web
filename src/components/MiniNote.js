import React from 'react';
import blue from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';
import { MINI_NOTE_SIZE_PIXELS } from '~/constants';

function MiniNote({ note, sounding, ...others }) {
  return (
    <rect
      x={note.x * MINI_NOTE_SIZE_PIXELS}
      y={note.y * MINI_NOTE_SIZE_PIXELS}
      width={note.length * MINI_NOTE_SIZE_PIXELS}
      height={MINI_NOTE_SIZE_PIXELS}
      fill={sounding ? lightBlue[300] : blue[500]}
      {...others}
    />
  );
}

export default MiniNote;
