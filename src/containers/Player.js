import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import grey from '@material-ui/core/colors/grey';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Play from 'mdi-material-ui/Play';
import Stop from 'mdi-material-ui/Stop';
import Heart from 'mdi-material-ui/Heart';
import HeartOutline from 'mdi-material-ui/HeartOutline';
import ClockOutline from 'mdi-material-ui/ClockOutline';
import Update from 'mdi-material-ui/Update';
import Headline from '~/components/Headline';
import Title from '~/components/Title';
import MiniNote from '~/components/MiniNote';
import { MINI_NOTE_SIZE_PIXELS } from '~/constants';
import { liesOn, toLocaleDateString } from '~/utils';
import { setX, resetPlayer } from '~/actions/player';
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

const Block = styled.div`
  display: flex;
  align-items: center;
`;

const User = styled.div`
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
    margin-left: 16px;
    margin-right: 4px;
    font-size: 1rem;
    color: ${grey[700]};
  }
`;

const SmallUpdate = styled(Update)`
  &&& {
    margin-left: 16px;
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

const MiniChartContainer = styled.div`
  margin-top: 8px;
  border: 1px solid ${grey[200]};
  border-radius: 1px;
  overflow: scroll;
`;

const MiniChart = styled.svg`
  display: block;
`;

const DenseButton = styled(Button)`
  &&& {
    min-width: 0;
  }
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

class Player extends React.Component {
  componentDidMount() {
    const { params } = this.props.match;
    const { signInUser, phrase } = this.props;
    if (!phrase || params.id_string !== phrase.id_string) {
      this.props.resetPlayer();
      this.props.requestFetchPhrase(params.id_string);
      if (signInUser)
        this.props.requestFetchUserLikedPhrase(
          signInUser.id_string,
          params.id_string
        );
    }
  }

  componentDidUpdate(prevProps) {
    const { params } = this.props.match;
    const { signInUser } = this.props;
    const { signInUser: prevSignInUser } = prevProps;
    if (typeof prevSignInUser === 'undefined' && signInUser)
      this.props.requestFetchUserLikedPhrase(
        signInUser.id_string,
        params.id_string
      );
  }

  componentWillUnmount() {
    if (this.props.playing) this.props.finishPlayNotes();
  }

  handleClickPlayOrStop = () => {
    const { playing } = this.props;
    if (playing) this.props.finishPlayNotes();
    else this.props.startPlayNotes();
  };

  handleClickHeart = () => {
    const { params } = this.props.match;
    const { signInUser, liked } = this.props;
    if (liked)
      this.props.requestDeleteUserLikedPhrase(
        signInUser.id_string,
        params.id_string
      );
    else this.props.requestCreateUserLikedPhrase(signInUser.id_string);
  };

  isMyPhrase = () => {
    const { params } = this.props.match;
    const { signInUser, phrase } = this.props;
    if (params.id_string) {
      if (signInUser && phrase)
        return signInUser.id_string === phrase.user.id_string;
      else return undefined;
    } else {
      return true;
    }
  };

  render() {
    const { phrase, liked, x, minX, maxX, minY, maxY, playing } = this.props;

    const width = Math.max(maxX - minX + 1, 0);
    const height = Math.max(maxY - minY + 1, 0);
    const isMyPhrase = this.isMyPhrase();

    if (!phrase) return null;

    return (
      <Root>
        <Grid container spacing={8} justify="center">
          <Grid item xs={10}>
            <PhraseTitle>{phrase.title}</PhraseTitle>
          </Grid>
          <Grid item xs={10}>
            <Block>
              <Avatar src={phrase.user.photo_url} />
              <User>
                <SmallText>by</SmallText>
                <Title>{phrase.user.display_name}</Title>
              </User>
            </Block>
          </Grid>
          <Grid item xs={10}>
            <Block>
              <SmallHeart />
              <SmallText>{phrase.likes_count}</SmallText>
              <SmallClock />
              <SmallText>
                {toLocaleDateString(new Date(phrase.created_at))}
              </SmallText>
              <SmallUpdate />
              <SmallText>
                {toLocaleDateString(new Date(phrase.updated_at))}
              </SmallText>
            </Block>
          </Grid>
          <Grid item xs={10}>
            <MiniChartContainer>
              <MiniChart
                width={width * MINI_NOTE_SIZE_PIXELS}
                height={height * MINI_NOTE_SIZE_PIXELS}
                viewBox={[
                  minX * MINI_NOTE_SIZE_PIXELS,
                  minY * MINI_NOTE_SIZE_PIXELS,
                  width * MINI_NOTE_SIZE_PIXELS,
                  height * MINI_NOTE_SIZE_PIXELS
                ].join(' ')}
              >
                {phrase.notes.map((note, idx) => (
                  <MiniNote
                    note={note}
                    sounding={playing && liesOn(note, x)}
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
              onClick={this.handleClickPlayOrStop}
            >
              {playing ? <StyledStop /> : <StyledPlay />}
              {playing ? 'Stop' : 'Play'}
            </Button>
          </Grid>
          {!isMyPhrase && (
            <Grid item xs={3}>
              <DenseButton
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={this.handleClickHeart}
              >
                {liked ? <Heart /> : <HeartOutline />}
              </DenseButton>
            </Grid>
          )}
        </Grid>
      </Root>
    );
  }
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
      setX,
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
