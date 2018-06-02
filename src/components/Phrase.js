import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import grey from '@material-ui/core/colors/grey';
import NoWrap from '~/components/NoWrap';
import Title from '~/components/Title';
import PhraseAuthor from '~/components/PhraseAuthor';
import PhraseMetadata from '~/components/PhraseMetadata';
import PhraseMenu from '~/components/PhraseMenu';

const Root = styled.div`
  display: flex;
  height: 74px;
  padding: 12px 8px;
  align-items: center;
  background-color: #fff;
  border: 1px solid ${grey[200]};
`;

const Left = styled.div`
  margin-left: 8px;
`;

const Right = styled(NoWrap)`
  margin-left: 12px;
  flex: 1;
`;

const MetadataContainer = styled.div`
  margin-top: 4px;
`;

function Phrase({ phrase, disableUserLink, disableMenu, onRequestDelete }) {
  return (
    <Root>
      <Left>
        <PhraseAuthor
          phrase={phrase}
          hideDisplayName
          disableLink={disableUserLink}
        />
      </Left>
      <Right>
        <Link to={`/${phrase.id_string}`}>
          <Title underline title={phrase.title}>
            {phrase.title}
          </Title>
        </Link>
        <MetadataContainer>
          <PhraseMetadata phrase={phrase} hideUpdatedAt />
        </MetadataContainer>
      </Right>
      {!disableMenu && (
        <PhraseMenu phrase={phrase} onRequestDelete={onRequestDelete} />
      )}
    </Root>
  );
}

export default Phrase;
