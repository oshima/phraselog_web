import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import grey from '@material-ui/core/colors/grey';
import lime from '@material-ui/core/colors/lime';
import { NOTE_SIZE } from '~/constants';
import Progress from '~/components/Progress';
import { setX } from '~/actions/editor';
import { startPlayNotes } from '~/thunks/editor';

const Root = styled.svg`
  display: block;
  position: sticky;
  top: 48px;
  cursor: pointer;
  opacity: 0.95;
  background-color: ${props => (props.playing ? lime[200] : grey[200])};
`;

class Seekbar extends React.PureComponent {
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
    const { x, width, playing } = this.props;

    return (
      <Root
        width={width * NOTE_SIZE}
        height={NOTE_SIZE}
        playing={playing}
        onMouseDown={this.handleMouseDown}
      >
        <Progress x={x} playing={playing} />
      </Root>
    );
  }
}

export default connect(
  state => ({
    x: state.editor.x,
    width: state.editor.width,
    drawing: state.editor.drawing,
    playing: state.editor.playing
  }),
  { setX, startPlayNotes }
)(Seekbar);
