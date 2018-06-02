import React from 'react';
import teal from '@material-ui/core/colors/teal';
import lime from '@material-ui/core/colors/lime';
import red from '@material-ui/core/colors/red';
import { NOTE_SIZE } from '~/constants';

function Note({ note, drawing, sounding, error, ...others }) {
  return (
    <rect
      x={note.x * NOTE_SIZE}
      y={note.y * NOTE_SIZE}
      width={note.length * NOTE_SIZE}
      height={NOTE_SIZE}
      opacity={drawing && 0.6}
      fill={error ? red[400] : sounding ? lime[300] : teal[400]}
      {...others}
    />
  );
}

export default Note;
