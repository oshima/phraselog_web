import React from 'react';
import styled from 'styled-components';
import grey from '@material-ui/core/colors/grey';
import PhraseAuthor from '~/components/PhraseAuthor';
import PhraseMetadata from '~/components/PhraseMetadata';

const Root = styled.div`
  position: fixed;
  align-items: center;
  bottom: 0;
  right: 0;
  margin: 8px;
  padding: 12px 16px;
  min-width: 224px;
  background-color: #fffffff5;
  border: 1px solid ${grey[200]};
  user-select: none;
  z-index: 1;
`;

const MetadataContainer = styled.div`
  margin-top: 8px;
`;

function MetadataDisplay({ phrase }) {
  return (
    <Root>
      <PhraseAuthor phrase={phrase} />
      <MetadataContainer>
        <PhraseMetadata phrase={phrase} />
      </MetadataContainer>
    </Root>
  );
}

export default MetadataDisplay;
