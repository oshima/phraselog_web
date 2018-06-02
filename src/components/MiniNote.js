import React from 'react';
import teal from '@material-ui/core/colors/teal';
import lime from '@material-ui/core/colors/lime';
import { MINI_NOTE_SIZE } from '~/constants';

function MiniNote({ note, sounding, ...others }) {
  return (
    <rect
      x={note.x * MINI_NOTE_SIZE}
      y={note.y * MINI_NOTE_SIZE}
      width={note.length * MINI_NOTE_SIZE}
      height={MINI_NOTE_SIZE}
      fill={sounding ? lime[300] : teal[400]}
      {...others}
    />
  );
}

export default MiniNote;
