import React from 'react';
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

class Chart extends React.PureComponent {
  componentWillUnmount() {
    if (this.props.playing) this.props.finishPlayNotes();
  }

  handleMouseDown = e => {
    if (this.props.drawing) this.props.finishDrawNote();
    else if (this.props.playing) this.props.finishPlayNotes();
    else this.props.startDrawNote(this.getCursor(e));
  };

  handleMouseMove = e => {
    if (this.props.drawing) {
      const cursor = this.getCursor(e);
      if (!equals(cursor, this.props.cursor))
        this.props.continueDrawNote(cursor);
    }
  };

  handleMouseUp = e => {
    if (this.props.drawing) this.props.finishDrawNote();
  };

  handleMouseDownNote = e => {
    if (!this.props.playing) {
      e.stopPropagation();
      const idx = e.currentTarget.dataset.idx;
      this.props.eraseNote(this.props.notes[idx]);
    }
  };

  getCursor = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / NOTE_SIZE) | 0;
    const y = ((e.clientY - rect.top) / NOTE_SIZE) | 0;
    return { x, y };
  };

  render() {
    const { x, width, note, notes, drawing, playing } = this.props;

    return (
      <Root
        width={width * NOTE_SIZE}
        height={CHART_HEIGHT * NOTE_SIZE}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
      >
        {notes.map((note, idx) => (
          <Note
            note={note}
            sounding={playing && liesOn(note, x)}
            onMouseDown={this.handleMouseDownNote}
            key={`${note.x},${note.y}`}
            data-idx={idx}
          />
        ))}
        {drawing &&
          note && (
            <Note
              note={note}
              drawing
              error={
                notes.length >= NOTES_COUNT_MAX ||
                notes.some(n => overlapsWith(n, note))
              }
            />
          )}
      </Root>
    );
  }
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
