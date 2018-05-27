import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DotsVertical from 'mdi-material-ui/DotsVertical';
import Headline from '~/components/Headline';
import Title from '~/components/Title';

class PhraseMenu extends React.Component {
  state = { anchorEl: null, open: false };

  handleClickButton = e => {
    this.setState({ anchorEl: e.currentTarget });
  };

  handleClickDelete = () => {
    this.setState({ anchorEl: null, open: true });
  };

  handleCloseMenu = () => {
    this.setState({ anchorEl: null });
  };

  handleCloseDialog = () => {
    this.setState({ open: false });
  };

  handleRequestDelete = () => {
    this.setState({ open: false });
    this.props.onRequestDelete(this.props.phrase);
  };

  render() {
    const { phrase } = this.props;
    const { anchorEl, open } = this.state;

    return (
      <>
        <IconButton
          onClick={this.handleClickButton}
          children={<DotsVertical />}
        />
        <Menu
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          open={Boolean(anchorEl)}
          onClose={this.handleCloseMenu}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <MenuItem
            onClick={this.handleClickDelete}
            children={<ListItemText>Delete</ListItemText>}
          />
        </Menu>
        <Dialog open={open} onClose={this.handleCloseDialog}>
          <DialogTitle>
            <Headline>Do you really want to delete?</Headline>
          </DialogTitle>
          <DialogContent>
            <Title>"{phrase.title}"</Title>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              onClick={this.handleCloseDialog}
              children={'Cancel'}
            />
            <Button
              color="secondary"
              onClick={this.handleRequestDelete}
              children={'Delete'}
            />
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default PhraseMenu;
