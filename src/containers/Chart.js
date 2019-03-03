import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Note from '~/components/Note';
import { CHART_HEIGHT, NOTES_COUNT_MAX, NOTE_SIZE } from '~/constants';
import { equals, liesOn, overlapsWith } from '~/utils';
import {
  startDrawNote,
  continueDrawNote,
  finishDrawNote,
  eraseNote,
  finishPlayNotes
} from '~/thunks/editor';

const Root = styled.svg`
  display: block;
`;

function Chart(props) {
  useEffect(() => props.finishPlayNotes, []);

  function handleMouseDown(e) {
    if (props.drawing) {
      props.finishDrawNote();
    } else if (props.playing) {
      props.finishPlayNotes();
    } else {
      props.startDrawNote(getCursor(e));
    }
  }

  function handleMouseMove(e) {
    if (props.drawing) {
      const cursor = getCursor(e);
      if (!equals(cursor, props.cursor)) props.continueDrawNote(cursor);
    }
  }

  function handleMouseUp(e) {
    if (props.drawing) props.finishDrawNote();
  }

  function handleMouseDownNote(e) {
    if (!props.playing) {
      e.stopPropagation();
      const idx = e.currentTarget.dataset.idx;
      props.eraseNote(props.notes[idx]);
    }
  }

  function getCursor(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / NOTE_SIZE) | 0;
    const y = ((e.clientY - rect.top) / NOTE_SIZE) | 0;
    return { x, y };
  }

  return (
    <Root
      width={props.width * NOTE_SIZE}
      height={CHART_HEIGHT * NOTE_SIZE}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {props.notes.map((note, idx) => (
        <Note
          note={note}
          sounding={props.playing && liesOn(note, props.x)}
          onMouseDown={handleMouseDownNote}
          key={`${note.x},${note.y}`}
          data-idx={idx}
        />
      ))}
      {props.drawing && props.note && (
        <Note
          note={props.note}
          drawing
          error={
            props.notes.length >= NOTES_COUNT_MAX ||
            props.notes.some(note => overlapsWith(note, props.note))
          }
        />
      )}
    </Root>
  );
}

export default connect(
  state => ({
    x: state.editor.x,
    width: state.editor.width,
    cursor: state.editor.cursor,
    note: state.editor.note,
    notes: state.editor.notes,
    drawing: state.editor.drawing,
    playing: state.editor.playing
  }),
  {
    startDrawNote,
    continueDrawNote,
    finishDrawNote,
    eraseNote,
    finishPlayNotes
  }
)(Chart);
