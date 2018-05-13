import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import grey from 'material-ui/colors/grey';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
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

const NoUnderline = styled.span`
  &:hover {
    text-decoration: none;
  }
`;

function Appbar({ signInUser }) {
  return (
    <Root>
      <Link to="/">
        <Logo />
      </Link>
      <Title flex>
        <Link to="/">
          <NoUnderline>phraselog</NoUnderline>
        </Link>
      </Title>
      <IconButton
        disabled={!signInUser}
        color="primary"
        component={Link}
        to="/new"
        children={<Pencil />}
      />
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
