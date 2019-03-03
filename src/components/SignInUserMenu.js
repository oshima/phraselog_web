import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import { signOut } from '~/auth';

const AvatarContainer = styled.div`
  padding: 8px;
  cursor: pointer;
`;

const SmallAvatar = styled(Avatar)`
  &&& {
    width: 32px;
    height: 32px;
  }
`;

function SignInUserMenu({ user }) {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <>
      <AvatarContainer onClick={e => setAnchorEl(e.currentTarget)}>
        <SmallAvatar src={user.photo_url} />
      </AvatarContainer>
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
          component={Link}
          to={`/users/${user.id_string}`}
          onClick={() => setAnchorEl(null)}
          children={<ListItemText>Profile</ListItemText>}
        />
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            signOut();
          }}
          children={<ListItemText>Sign out</ListItemText>}
        />
      </Menu>
    </>
  );
}

export default SignInUserMenu;
