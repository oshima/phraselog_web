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

class Seekbar extends React.PureComponent {
  handleMouseEnter = () => {
    this.props.setHovering(true);
  };

  handleMouseLeave = () => {
    this.props.setHovering(false);
  };

  handleMouseDown = e => {
    if (!this.props.drawing) {
      this.props.setX(this.getX(e));
      if (!this.props.playing) this.props.startPlayNotes();
    }
  };

  getX = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / NOTE_SIZE) | 0;
    return x;
  };

  render() {
    const { x, width, hovering } = this.props;

    return (
      <Root
        width={width * NOTE_SIZE}
        height={NOTE_SIZE}
        hovering={hovering}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseDown={this.handleMouseDown}
      >
        <Progress x={x} />
      </Root>
    );
  }
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
