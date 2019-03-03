import React, { useState } from 'react';
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

function PhraseMenu({ phrase, onRequestDelete }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        onClick={e => setAnchorEl(e.currentTarget)}
        children={<DotsVertical />}
      />
      <Menu
        disableAutoFocusItem
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setOpen(true);
          }}
          children={<ListItemText>Delete</ListItemText>}
        />
      </Menu>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          <Headline>Do you really want to delete?</Headline>
        </DialogTitle>
        <DialogContent>
          <Title>"{phrase.title}"</Title>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => setOpen(false)}
            children={'Cancel'}
          />
          <Button
            color="secondary"
            onClick={() => {
              setOpen(false);
              onRequestDelete(phrase);
            }}
            children={'Delete'}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PhraseMenu;
