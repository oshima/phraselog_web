import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import grey from '@material-ui/core/colors/grey';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Pencil from 'mdi-material-ui/Pencil';
import Logo from '~/components/Logo';
import Title from '~/components/Title';
import SignInButton from '~/components/SignInButton';
import SignInUserMenu from '~/components/SignInUserMenu';
import Loading from '~/components/Loading';

const Root = styled.div`
  position: fixed;
  display: flex;
  left: 0;
  right: 0;
  top: 0;
  height: 48px;
  padding: 0 8px;
  align-items: center;
  background-color: ${grey[50]};
  z-index: 1;
`;

const TitleContainer = styled.div`
  flex: 1;
`;

function Appbar({ signInUser }) {
  return (
    <Root>
      <Link to="/">
        <Logo />
      </Link>
      <TitleContainer>
        <Link to="/">
          <Title>Phraselog</Title>
        </Link>
      </TitleContainer>
      {device.type === 'desktop' && (
        <IconButton
          disabled={!signInUser}
          color="primary"
          component={Link}
          to="/new"
          children={<Pencil />}
        />
      )}
      {signInUser ? (
        <SignInUserMenu user={signInUser} />
      ) : typeof signInUser === 'undefined' ? (
        <Loading />
      ) : (
        <SignInButton />
      )}
    </Root>
  );
}

export default connect(state => ({
  signInUser: state.auth.signInUser
}))(Appbar);
