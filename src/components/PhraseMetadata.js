import React from 'react';
import styled from 'styled-components';
import grey from '@material-ui/core/colors/grey';
import Typography from '@material-ui/core/Typography';
import HeartOutline from 'mdi-material-ui/HeartOutline';
import ClockOutline from 'mdi-material-ui/ClockOutline';
import Update from 'mdi-material-ui/Update';
import { toLocaleDateString } from '~/utils';

const Root = styled.div`
  display: flex;
  align-items: center;
`;

const StyledHeart = styled(HeartOutline)`
  &&& {
    margin-right: 4px;
    font-size: 1rem;
    color: ${grey[700]};
  }
`;

const StyledClock = styled(ClockOutline)`
  &&& {
    margin-left: 16px;
    margin-right: 4px;
    font-size: 1rem;
    color: ${grey[700]};
  }
`;

const StyledUpdate = styled(Update)`
  &&& {
    margin-left: 16px;
    margin-right: 4px;
    font-size: 1rem;
    color: ${grey[700]};
  }
`;

const Text = styled(Typography)`
  &&& {
    color: ${grey[700]};
  }
`;

function PhraseMetadata({ phrase, hideUpdatedAt }) {
  return (
    <Root>
      <StyledHeart />
      <Text>{phrase.likes_count}</Text>
      <StyledClock />
      <Text>{toLocaleDateString(new Date(phrase.created_at))}</Text>
      {!hideUpdatedAt &&
        phrase.created_at !== phrase.updated_at && (
          <>
            <StyledUpdate />
            <Text>{toLocaleDateString(new Date(phrase.updated_at))}</Text>
          </>
        )}
    </Root>
  );
}

export default PhraseMetadata;
