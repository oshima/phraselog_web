import React from 'react';
import blue from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';
import { MINI_NOTE_SIZE } from '~/constants';

function MiniNote({ note, sounding, ...others }) {
  return (
    <rect
      x={note.x * MINI_NOTE_SIZE}
      y={note.y * MINI_NOTE_SIZE}
      width={note.length * MINI_NOTE_SIZE}
      height={MINI_NOTE_SIZE}
      fill={sounding ? lightBlue[300] : blue[500]}
      {...others}
    />
  );
}

export default MiniNote;
