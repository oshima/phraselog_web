import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import grey from '@material-ui/core/colors/grey';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Play from 'mdi-material-ui/Play';
import Stop from 'mdi-material-ui/Stop';
import Heart from 'mdi-material-ui/Heart';
import HeartOutline from 'mdi-material-ui/HeartOutline';
import Headline from '~/components/Headline';
import PhraseAuthor from '~/components/PhraseAuthor';
import PhraseMetadata from '~/components/PhraseMetadata';
import MiniNote from '~/components/MiniNote';
import { MINI_NOTE_SIZE } from '~/constants';
import { liesOn } from '~/utils';
import { resetPlayer } from '~/actions/player';
import {
  startPlayNotes,
  finishPlayNotes,
  requestFetchPhrase,
  requestCreateUserLikedPhrase,
  requestFetchUserLikedPhrase,
  requestDeleteUserLikedPhrase
} from '~/thunks/player';

const Root = styled.div`
  padding: 24px 0;
  overflow-x: hidden;
`;

const PhraseTitle = styled(Headline)`
  padding: 8px 0;
`;

const MiniChartContainer = styled.div`
  margin: 16px 0;
  overflow: scroll;
`;

const MiniChart = styled.svg`
  display: block;
`;

const StyledPlay = styled(Play)`
  &&& {
    margin-right: 4px;
  }
`;

const StyledStop = styled(Stop)`
  &&& {
    margin-right: 4px;
  }
`;

function Player(props) {
  useEffect(
    () => {
      const { params } = props.match;
      const { phrase } = props;
      if (!phrase || params.id_string !== phrase.id_string) {
        props.resetPlayer();
        props.requestFetchPhrase(params.id_string);
      }
    },
    [props.match]
  );

  useEffect(
    () => {
      const { params } = props.match;
      const { signInUser } = props;
      if (signInUser) {
        props.requestFetchUserLikedPhrase(
          signInUser.id_string,
          params.id_string
        );
      }
    },
    [props.signInUser]
  );

  useEffect(() => props.finishPlayNotes, []);

  function handleClickPlayOrStop() {
    const { playing } = props;
    if (playing) {
      props.finishPlayNotes();
    } else {
      props.startPlayNotes();
    }
  }

  function handleClickHeart() {
    const { params } = props.match;
    const { signInUser, liked } = props;
    if (liked) {
      props.requestDeleteUserLikedPhrase(
        signInUser.id_string,
        params.id_string
      );
    } else {
      props.requestCreateUserLikedPhrase(signInUser.id_string);
    }
  }

  function isMyPhrase() {
    const { params } = props.match;
    const { signInUser, phrase } = props;
    if (params.id_string) {
      if (signInUser && phrase) {
        return signInUser.id_string === phrase.user.id_string;
      } else {
        return undefined;
      }
    } else {
      return true;
    }
  }

  const width = Math.max(props.maxX - props.minX + 1, 0);
  const height = Math.max(props.maxY - props.minY + 1, 0);
  const isMyPhrase = isMyPhrase();

  if (!props.phrase) return null;

  return (
    <Root>
      <Grid container spacing={8} justify="center">
        <Grid item xs={10}>
          <PhraseTitle>{props.phrase.title}</PhraseTitle>
        </Grid>
        <Grid item xs={10}>
          <PhraseAuthor phrase={props.phrase} />
        </Grid>
        <Grid item xs={10}>
          <PhraseMetadata phrase={props.phrase} />
        </Grid>

        <Grid item xs={10}>
          <MiniChartContainer>
            <MiniChart
              width={width * MINI_NOTE_SIZE}
              height={height * MINI_NOTE_SIZE}
              viewBox={[
                props.minX * MINI_NOTE_SIZE,
                props.minY * MINI_NOTE_SIZE,
                width * MINI_NOTE_SIZE,
                height * MINI_NOTE_SIZE
              ].join(' ')}
            >
              {props.phrase.notes.map((note, idx) => (
                <MiniNote
                  note={note}
                  sounding={props.playing && liesOn(note, props.x)}
                  key={`${note.x},${note.y}`}
                />
              ))}
            </MiniChart>
          </MiniChartContainer>
        </Grid>

        <Grid item xs={isMyPhrase ? 10 : 7}>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={handleClickPlayOrStop}
          >
            {props.playing ? <StyledStop /> : <StyledPlay />}
            {props.playing ? 'Stop' : 'Play'}
          </Button>
        </Grid>
        {!isMyPhrase && (
          <Grid item xs={3}>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              disabled={typeof isMyPhrase === 'undefined'}
              onClick={handleClickHeart}
            >
              {props.liked ? <Heart /> : <HeartOutline />}
            </Button>
          </Grid>
        )}
      </Grid>
    </Root>
  );
}

export default withRouter(
  connect(
    state => ({
      signInUser: state.auth.signInUser,
      phrase: state.player.phrase,
      liked: state.player.liked,
      x: state.player.x,
      minX: state.player.minX,
      maxX: state.player.maxX,
      minY: state.player.minY,
      maxY: state.player.maxY,
      playing: state.player.playing
    }),
    {
      resetPlayer,
      startPlayNotes,
      finishPlayNotes,
      requestFetchPhrase,
      requestCreateUserLikedPhrase,
      requestFetchUserLikedPhrase,
      requestDeleteUserLikedPhrase
    }
  )(Player)
);
