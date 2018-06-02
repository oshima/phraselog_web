import React from 'react';
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

class Toolbar extends React.Component {
  componentDidMount() {
    const { params } = this.props.match;
    const { signInUser, phrase } = this.props;
    if (params.id_string) {
      if (!phrase || params.id_string !== phrase.id_string) {
        this.props.resetEditor();
        this.props.requestFetchPhrase(params.id_string);
        if (signInUser)
          this.props.requestFetchUserLikedPhrase(
            signInUser.id_string,
            params.id_string
          );
      }
    } else {
      if (phrase) this.props.resetEditor();
    }
  }

  componentDidUpdate(prevProps) {
    const { params } = this.props.match;
    const { signInUser } = this.props;
    const { signInUser: prevSignInUser } = prevProps;
    if (params.id_string && typeof prevSignInUser === 'undefined' && signInUser)
      this.props.requestFetchUserLikedPhrase(
        signInUser.id_string,
        params.id_string
      );
  }

  handleMouseEnter = () => {
    this.props.setHovering(true);
  };

  handleMouseLeave = () => {
    this.props.setHovering(false);
  };

  handleChangeInput = e => {
    const title = e.currentTarget.value;
    if (title.length <= TITLE_LENGTH_MAX) this.props.setTitle(title);
  };

  handleClickChevronLeft = () => {
    const { interval } = this.props;
    if (interval > INTERVAL_MIN)
      this.props.setInterval(Math.round((interval - 0.01) * 100) / 100);
  };

  handleClickChevronRight = () => {
    const { interval } = this.props;
    if (interval < INTERVAL_MAX)
      this.props.setInterval(Math.round((interval + 0.01) * 100) / 100);
  };

  handleClickContentSave = () => {
    const { params } = this.props.match;
    if (params.id_string) this.props.requestUpdatePhrase(params.id_string);
    else this.props.requestCreatePhrase();
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

  canSave = () => {
    const { phrase, title, interval, notes, pointer } = this.props;
    const isBlank = title === '' || notes.length === 0;
    if (phrase) {
      const isChanged =
        title !== phrase.title || interval !== phrase.interval || pointer > 0;
      return !isBlank && isChanged;
    } else {
      return !isBlank;
    }
  };

  render() {
    const {
      signInUser,
      phrase,
      title,
      interval,
      liked,
      notes,
      operations,
      pointer,
      playing,
      saving,
      clearNotes,
      undoOperation,
      redoOperation
    } = this.props;

    const isMyPhrase = this.isMyPhrase();

    return (
      <Root
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Link to="/">
          <Logo />
        </Link>
        <TitleContainer>
          {isMyPhrase ? (
            <TitleInput value={title} onChange={this.handleChangeInput} />
          ) : (
            <Title title={title}>{title}</Title>
          )}
        </TitleContainer>
        <Space />
        <Hidden xsDown>
          <IconButton
            disabled={interval <= 0.1}
            onClick={this.handleClickChevronLeft}
            children={<ChevronLeft />}
          />
          <Hidden smDown>
            <IntervalDisplay value={interval} />
          </Hidden>
          <IconButton
            disabled={interval >= 1}
            onClick={this.handleClickChevronRight}
            children={<ChevronRight />}
          />
          <IconButton
            disabled={playing || pointer === 0}
            onClick={undoOperation}
            children={<Undo />}
          />
          <IconButton
            disabled={playing || pointer === operations.length}
            onClick={redoOperation}
            children={<Redo />}
          />
          <IconButton
            disabled={playing || notes.length === 0}
            onClick={clearNotes}
            children={<Delete />}
          />
        </Hidden>
        {isMyPhrase ? (
          saving ? (
            <Loading />
          ) : (
            <IconButton
              color="primary"
              disabled={!this.canSave()}
              onClick={this.handleClickContentSave}
              children={<ContentSave />}
            />
          )
        ) : (
          <IconButton
            color="secondary"
            disabled={typeof isMyPhrase === 'undefined'}
            onClick={this.handleClickHeart}
            children={liked ? <Heart /> : <HeartOutline />}
          />
        )}
        {signInUser ? (
          <SignInUserMenu user={signInUser} />
        ) : typeof signInUser === 'undefined' ? (
          <Loading />
        ) : (
          <SignInButton />
        )}
        {phrase && <MetadataDisplay phrase={phrase} />}
      </Root>
    );
  }
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
