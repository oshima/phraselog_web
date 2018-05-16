import React from 'react';
import blue from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';
import red from '@material-ui/core/colors/red';
import { NOTE_SIZE_PIXELS } from '~/constants';

function Note({ note, drawing, sounding, error, ...others }) {
  return (
    <rect
      x={note.x * NOTE_SIZE_PIXELS}
      y={note.y * NOTE_SIZE_PIXELS}
      width={note.length * NOTE_SIZE_PIXELS}
      height={NOTE_SIZE_PIXELS}
      opacity={drawing && 0.6}
      fill={error ? red[500] : sounding ? lightBlue[300] : blue[500]}
      {...others}
    />
  );
}

export default Note;
