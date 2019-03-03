import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import grey from '@material-ui/core/colors/grey';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeft from 'mdi-material-ui/ChevronLeft';
import ChevronRight from 'mdi-material-ui/ChevronRight';
import Undo from 'mdi-material-ui/Undo';
import Redo from 'mdi-material-ui/Redo';
import Delete from 'mdi-material-ui/Delete';
import Heart from 'mdi-material-ui/Heart';
import HeartOutline from 'mdi-material-ui/HeartOutline';
import ContentSave from 'mdi-material-ui/ContentSave';
import Logo from '~/components/Logo';
import NoWrap from '~/components/NoWrap';
import Title from '~/components/Title';
import TitleInput from '~/components/TitleInput';
import IntervalDisplay from '~/components/IntervalDisplay';
import SignInButton from '~/components/SignInButton';
import SignInUserMenu from '~/components/SignInUserMenu';
import MetadataDisplay from '~/components/MetadataDisplay';
import Loading from '~/components/Loading';
import { TITLE_LENGTH_MAX, INTERVAL_MIN, INTERVAL_MAX } from '~/constants';
import {
  setTitle,
  setInterval,
  setHovering,
  resetEditor
} from '~/actions/editor';
import {
  clearNotes,
  undoOperation,
  redoOperation,
  requestCreatePhrase,
  requestFetchPhrase,
  requestUpdatePhrase,
  requestCreateUserLikedPhrase,
  requestFetchUserLikedPhrase,
  requestDeleteUserLikedPhrase
} from '~/thunks/editor';

const Root = styled.div`
  position: fixed;
  display: flex;
  left: 0;
  right: 0;
  top: 0;
  height: 56px;
  padding: 4px 8px;
  align-items: center;
  background-color: ${grey[50]};
  z-index: 1;
`;

const TitleContainer = styled(NoWrap)`
  flex: 1;
`;

const Space = styled.span`
  flex: 1;
`;

function Toolbar(props) {
  useEffect(
    () => {
      const { params } = props.match;
      const { phrase } = props;
      if (params.id_string) {
        if (!phrase || params.id_string !== phrase.id_string) {
          props.resetEditor();
          props.requestFetchPhrase(params.id_string);
        }
      } else {
        if (phrase) props.resetEditor();
      }
    },
    [props.match]
  );

  useEffect(
    () => {
      const { params } = props.match;
      const { signInUser } = props;
      if (params.id_string && signInUser) {
        props.requestFetchUserLikedPhrase(
          signInUser.id_string,
          params.id_string
        );
      }
    },
    [props.signInUser]
  );

  function handleMouseEnter() {
    props.setHovering(true);
  }

  function handleMouseLeave() {
    props.setHovering(false);
  }

  function handleChangeInput(e) {
    const title = e.currentTarget.value;
    if (title.length <= TITLE_LENGTH_MAX) {
      props.setTitle(title);
    }
  }

  function handleClickChevronLeft() {
    const { interval } = props;
    if (interval > INTERVAL_MIN) {
      props.setInterval(Math.round((interval - 0.01) * 100) / 100);
    }
  }

  function handleClickChevronRight() {
    const { interval } = props;
    if (interval < INTERVAL_MAX) {
      props.setInterval(Math.round((interval + 0.01) * 100) / 100);
    }
  }

  function handleClickContentSave() {
    const { params } = props.match;
    if (params.id_string) {
      props.requestUpdatePhrase(params.id_string);
    } else {
      props.requestCreatePhrase();
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

  function canSave() {
    const { phrase, title, interval, notes, pointer } = props;
    const isBlank = title === '' || notes.length === 0;
    if (phrase) {
      const isChanged =
        title !== phrase.title || interval !== phrase.interval || pointer > 0;
      return !isBlank && isChanged;
    } else {
      return !isBlank;
    }
  }

  const isMyPhrase = isMyPhrase();

  return (
    <Root onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Link to="/">
        <Logo />
      </Link>

      <TitleContainer>
        {isMyPhrase ? (
          <TitleInput value={props.title} onChange={handleChangeInput} />
        ) : (
          <Title title={props.title}>{props.title}</Title>
        )}
      </TitleContainer>

      <Space />

      <Hidden xsDown>
        <IconButton
          disabled={props.interval <= 0.1}
          onClick={handleClickChevronLeft}
          children={<ChevronLeft />}
        />
        <Hidden smDown>
          <IntervalDisplay value={props.interval} />
        </Hidden>
        <IconButton
          disabled={props.interval >= 1}
          onClick={handleClickChevronRight}
          children={<ChevronRight />}
        />

        <IconButton
          disabled={props.playing || props.pointer === 0}
          onClick={props.undoOperation}
          children={<Undo />}
        />
        <IconButton
          disabled={props.playing || props.pointer === props.operations.length}
          onClick={props.redoOperation}
          children={<Redo />}
        />
        <IconButton
          disabled={props.playing || props.notes.length === 0}
          onClick={props.clearNotes}
          children={<Delete />}
        />
      </Hidden>

      {isMyPhrase ? (
        props.saving ? (
          <Loading />
        ) : (
          <IconButton
            color="primary"
            disabled={!canSave()}
            onClick={handleClickContentSave}
            children={<ContentSave />}
          />
        )
      ) : (
        <IconButton
          color="secondary"
          disabled={typeof isMyPhrase === 'undefined'}
          onClick={handleClickHeart}
          children={props.liked ? <Heart /> : <HeartOutline />}
        />
      )}

      {props.signInUser ? (
        <SignInUserMenu user={props.signInUser} />
      ) : typeof props.signInUser === 'undefined' ? (
        <Loading />
      ) : (
        <SignInButton />
      )}
      {props.phrase && <MetadataDisplay phrase={props.phrase} />}
    </Root>
  );
}

export default withRouter(
  connect(
    state => ({
      signInUser: state.auth.signInUser,
      phrase: state.editor.phrase,
      title: state.editor.title,
      interval: state.editor.interval,
      liked: state.editor.liked,
      notes: state.editor.notes,
      operations: state.editor.operations,
      pointer: state.editor.pointer,
      playing: state.editor.playing,
      saving: state.editor.saving
    }),
    {
      setTitle,
      setInterval,
      setHovering,
      resetEditor,
      clearNotes,
      undoOperation,
      redoOperation,
      requestCreatePhrase,
      requestFetchPhrase,
      requestUpdatePhrase,
      requestCreateUserLikedPhrase,
      requestFetchUserLikedPhrase,
      requestDeleteUserLikedPhrase
    }
  )(Toolbar)
);
