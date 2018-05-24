import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import grey from '@material-ui/core/colors/grey';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import HeartOutline from 'mdi-material-ui/HeartOutline';
import ClockOutline from 'mdi-material-ui/ClockOutline';
import Update from 'mdi-material-ui/Update';
import PhraseMenu from '~/components/PhraseMenu';
import Title from '~/components/Title';
import { toLocaleDateString } from '~/utils';

const Root = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  bottom: 0;
  right: 0;
  border-top: 1px solid ${grey[200]};
  border-left: 1px solid ${grey[200]};
  border-radius: 1px;
  background-color: rgba(255, 255, 255, 0.95);
  user-select: none;
  z-index: 1;
`;

const Block = styled.div`
  padding: 12px 16px;
  min-width: ${props => props.minWidth && props.minWidth + 'px'};
  max-width: ${props => props.maxWidth && props.maxWidth + 'px'};
  &:not(:last-child) {
    border-right: 1px solid ${grey[200]};
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.div`
  margin-left: 12px;
`;

const SmallHeart = styled(HeartOutline)`
  &&& {
    margin-right: 4px;
    font-size: 1rem;
    color: ${grey[700]};
  }
`;

const SmallClock = styled(ClockOutline)`
  &&& {
    margin-right: 4px;
    font-size: 1rem;
    color: ${grey[700]};
  }
`;

const SmallUpdate = styled(Update)`
  &&& {
    margin-right: 4px;
    font-size: 1rem;
    color: ${grey[700]};
  }
`;

const SmallText = styled(Typography)`
  &&& {
    color: ${grey[700]};
  }
`;

function MetadataDisplay({ phrase }) {
  return (
    <Root>
      <Block maxWidth={256}>
        <Row>
          <Link to={`/users/${phrase.user.id_string}`}>
            <Avatar
              src={phrase.user.photo_url}
              title={phrase.user.display_name}
            />
          </Link>
          <UserName>
            <SmallText>by</SmallText>
            <Link to={`/users/${phrase.user.id_string}`}>
              <Title underline title={phrase.user.display_name}>
                {phrase.user.display_name}
              </Title>
            </Link>
          </UserName>
        </Row>
      </Block>
      <Block minWidth={128}>
        <Row>
          <SmallHeart />
          <SmallText>{phrase.likes_count}</SmallText>
        </Row>
        <Row>
          <SmallClock />
          <SmallText>
            {toLocaleDateString(new Date(phrase.created_at))}
          </SmallText>
        </Row>
        {phrase.created_at !== phrase.updated_at && (
          <Row>
            <SmallUpdate />
            <SmallText>
              {toLocaleDateString(new Date(phrase.updated_at))}
            </SmallText>
          </Row>
        )}
      </Block>
    </Root>
  );
}

export default MetadataDisplay;
