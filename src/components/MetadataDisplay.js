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
  padding: 12px 16px;
  min-width: 192px;
  border-top: 1px solid ${grey[200]};
  border-left: 1px solid ${grey[200]};
  border-radius: 1px;
  background-color: rgba(255, 255, 255, 0.97);
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
