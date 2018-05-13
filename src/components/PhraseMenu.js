import React from 'react';
import styled from 'styled-components';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Menu, { MenuItem } from 'material-ui/Menu';
import { ListItemText } from 'material-ui/List';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogActions
} from 'material-ui/Dialog';
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
      <React.Fragment>
        <IconButton
          onClick={this.handleClickButton}
          children={<DotsVertical />}
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleCloseMenu}
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
      </React.Fragment>
    );
  }
}

export default PhraseMenu;
