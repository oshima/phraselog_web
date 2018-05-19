import React from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import { hideMessage } from '~/actions/notificator';

function Notificator({ message, hideMessage }) {
  return (
    <Snackbar
      message={message}
      open={Boolean(message)}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={2500}
      onClose={hideMessage}
    />
  );
}

export default connect(
  state => ({
    message: state.notificator.message
  }),
  { hideMessage }
)(Notificator);
