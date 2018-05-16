import React from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import LoginVariant from 'mdi-material-ui/LoginVariant';
import Twitter from 'mdi-material-ui/Twitter';
import Google from 'mdi-material-ui/Google';
import Headline from '~/components/Headline';
import ProviderButton from '~/components/ProviderButton';
import { signInWithTwitter, signInWithGoogle } from '~/auth';

const Space = styled.div`
  height: 8px;
`;

class SignInButton extends React.Component {
  state = { open: false };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;

    return (
      <React.Fragment>
        <IconButton
          color="primary"
          onClick={this.handleClick}
          children={<LoginVariant />}
        />
        <Dialog open={open} onClose={this.handleClose}>
          <DialogTitle>
            <Headline>Sign in</Headline>
          </DialogTitle>
          <DialogContent>
            <ProviderButton
              color="#1da1f2"
              icon={<Twitter />}
              onClick={signInWithTwitter}
              children="with Twitter"
            />
            <Space />
            <ProviderButton
              color="#db4437"
              icon={<Google />}
              onClick={signInWithGoogle}
              children="with Google"
            />
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default SignInButton;
