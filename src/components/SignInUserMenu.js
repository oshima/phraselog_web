import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import { signOut } from '~/auth';

const SmallAvatar = styled(Avatar)`
  &&& {
    width: 32px;
    height: 32px;
  }
`;

class SignInUserMenu extends React.Component {
  state = { anchorEl: null };

  handleClick = e => {
    this.setState({ anchorEl: e.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleClickProfile = () => {
    this.handleClose();
  };

  handleClickSignOut = () => {
    this.handleClose();
    signOut();
  };

  render() {
    const { user } = this.props;
    const { anchorEl } = this.state;

    return (
      <React.Fragment>
        <IconButton onClick={this.handleClick}>
          <SmallAvatar src={user.photo_url} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem
            component={Link}
            to={`/users/${user.id_string}`}
            onClick={this.handleClickProfile}
            children={<ListItemText>Profile</ListItemText>}
          />
          <MenuItem
            onClick={this.handleClickSignOut}
            children={<ListItemText>Sign out</ListItemText>}
          />
        </Menu>
      </React.Fragment>
    );
  }
}

export default SignInUserMenu;
