import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import grey from 'material-ui/colors/grey';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import HeartOutline from 'mdi-material-ui/HeartOutline';
import Clock from 'mdi-material-ui/Clock';
import PhraseMenu from '~/components/PhraseMenu';
import NoWrap from '~/components/NoWrap';
import Title from '~/components/Title';
import { toLocaleDateString } from '~/utils';

const Root = styled.div`
  display: flex;
  padding: 12px 8px;
  align-items: center;
  border: 1px solid ${grey[200]};
  border-radius: 1px;
`;

const UserArea = styled.div`
  margin-left: 8px;
`;

const InfoArea = styled(NoWrap)`
  margin-left: 12px;
  flex: 1;
`;

const Metadata = styled.div`
  display: flex;
  margin-top: 4px;
  align-items: center;
`;

const SmallHeart = styled(HeartOutline)`
  &&& {
    font-size: 1rem;
    color: ${grey[700]};
  }
`;

const SmallClock = styled(Clock)`
  &&& {
    margin-left: 16px;
    font-size: 1rem;
    color: ${grey[700]};
  }
`;

const SmallText = styled(Typography)`
  &&& {
    margin-left: 4px;
    color: ${grey[700]};
  }
`;

function Phrase({ phrase, disableUserLink, disableMenu, onRequestDelete }) {
  return (
    <Root>
      <UserArea>
        {disableUserLink ? (
          <Avatar src={phrase.user.photo_url} />
        ) : (
          <Link to={`/users/${phrase.user.id_string}`}>
            <Avatar src={phrase.user.photo_url} />
          </Link>
        )}
      </UserArea>
      <InfoArea>
        <Link to={`/${phrase.id_string}`}>
          <Title underline>{phrase.title}</Title>
        </Link>
        <Metadata>
          <SmallHeart />
          <SmallText>{phrase.likes_count}</SmallText>
          <SmallClock />
          <SmallText>
            {toLocaleDateString(new Date(phrase.created_at))}
          </SmallText>
        </Metadata>
      </InfoArea>
      {!disableMenu && (
        <PhraseMenu phrase={phrase} onRequestDelete={onRequestDelete} />
      )}
    </Root>
  );
}

export default Phrase;
