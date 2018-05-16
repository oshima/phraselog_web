import React from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import { hideMessage } from '~/actions/notificator';

function Notificator({ message, hideMessage }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={Boolean(message)}
      autoHideDuration={2500}
      onClose={hideMessage}
      message={message}
    />
  );
}

export default connect(
  state => ({
    message: state.notificator.message
  }),
  { hideMessage }
)(Notificator);
