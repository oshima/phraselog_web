import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import grey from '@material-ui/core/colors/grey';
import { NOTE_SIZE } from '~/constants';
import Progress from '~/components/Progress';
import { setX, setHovering } from '~/actions/editor';
import { startPlayNotes } from '~/thunks/editor';

const Root = styled.svg`
  display: block;
  position: sticky;
  top: 56px;
  cursor: pointer;
  background-color: ${grey[200]};
  opacity: ${props => (props.hovering ? 0.9 : 0)};
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

function Seekbar(props) {
  function handleMouseEnter() {
    props.setHovering(true);
  }

  function handleMouseLeave() {
    props.setHovering(false);
  }

  function handleMouseDown(e) {
    if (!props.drawing) {
      props.setX(getX(e));
      if (!props.playing) props.startPlayNotes();
    }
  }

  function getX(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / NOTE_SIZE) | 0;
    return x;
  }

  return (
    <Root
      width={props.width * NOTE_SIZE}
      height={NOTE_SIZE}
      hovering={props.hovering}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
    >
      <Progress x={props.x} />
    </Root>
  );
}

export default connect(
  state => ({
    x: state.editor.x,
    width: state.editor.width,
    drawing: state.editor.drawing,
    hovering: state.editor.hovering,
    playing: state.editor.playing
  }),
  { setX, setHovering, startPlayNotes }
)(Seekbar);
