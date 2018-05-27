import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import grey from '@material-ui/core/colors/grey';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Title from '~/components/Title';

const Root = styled.div`
  display: flex;
  align-items: center;
`;

const DisplayName = styled.div`
  margin-left: 12px;
`;

const Text = styled(Typography)`
  &&& {
    color: ${grey[700]};
  }
`;

function PhraseAuthor({ phrase, hideDisplayName, disableLink }) {
  const { user } = phrase;

  return (
    <Root>
      {disableLink ? (
        <Avatar src={user.photo_url} title={user.display_name} />
      ) : (
        <Link to={`/users/${user.id_string}`}>
          <Avatar src={user.photo_url} title={user.display_name} />
        </Link>
      )}
      {!hideDisplayName && (
        <DisplayName>
          <Text>by</Text>
          {disableLink ? (
            <Title title={user.display_name}>{user.display_name}</Title>
          ) : (
            <Link to={`/users/${user.id_string}`}>
              <Title underline title={user.display_name}>
                {user.display_name}
              </Title>
            </Link>
          )}
        </DisplayName>
      )}
    </Root>
  );
}

export default PhraseAuthor;
