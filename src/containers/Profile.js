import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import grey from '@material-ui/core/colors/grey';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Avatar from '@material-ui/core/Avatar';
import Pencil from 'mdi-material-ui/Pencil';
import Heart from 'mdi-material-ui/Heart';
import Headline from '~/components/Headline';
import Title from '~/components/Title';
import Phrase from '~/components/Phrase';
import { signOut } from '~/auth';
import { setActiveTab, resetProfile } from '~/actions/profile';
import {
  requestFetchUser,
  requestDeletePhrase,
  requestFetchUserPhrases,
  requestFetchUserLikedPhrases
} from '~/thunks/profile';

const Root = styled.div`
  padding: 24px 0;
  overflow-x: hidden;
`;

const UserRoot = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 4px;
`;

const UserName = styled(Headline)`
  margin-left: 12px;
`;

const TabsContainer = styled.div`
  background-color: ${grey[200]};
`;

const SkeletonPhrase = styled.div`
  padding: 12px 16px;
  height: 74px;
  border: 1px dashed ${grey[300]};
`;

function Profile(props) {
  useEffect(
    () => {
      const { params } = props.match;
      const { user } = props;
      if (user && params.id_string !== user.id_string) {
        props.resetProfile();
      }
      props.requestFetchUser(params.id_string);
      props.requestFetchUserPhrases(params.id_string);
      props.requestFetchUserLikedPhrases(params.id_string);
    },
    [props.match]
  );

  function handleChange(e, value) {
    props.setActiveTab(value);
  }

  function handleRequestDelete(phrase) {
    props.requestDeletePhrase(phrase.id_string);
  }

  function isMyProfile() {
    const { signInUser, user } = props;
    if (signInUser && user) {
      return signInUser.id_string === user.id_string;
    } else {
      return undefined;
    }
  }

  const isMyProfile = isMyProfile();

  return (
    <Root>
      <Grid container spacing={8} justify="center">
        <Grid item xs={10}>
          <UserRoot>
            <Avatar src={props.user && props.user.photo_url} />
            <UserName>{props.user && props.user.display_name}</UserName>
          </UserRoot>
        </Grid>
        <Grid item xs={10}>
          <TabsContainer>
            <Tabs
              value={props.activeTab}
              indicatorColor={props.activeTab === 0 ? 'primary' : 'secondary'}
              textColor={props.activeTab === 0 ? 'primary' : 'secondary'}
              onChange={handleChange}
            >
              <Tab
                label={
                  <>
                    <Hidden mdUp children={<Pencil />} />
                    <Hidden smDown children={'Phrases'} />
                  </>
                }
              />
              <Tab
                label={
                  <>
                    <Hidden mdUp children={<Heart />} />
                    <Hidden smDown children={'Liked'} />
                  </>
                }
              />
            </Tabs>
          </TabsContainer>
        </Grid>
        <Grid item xs={10}>
          <Grid container spacing={8}>
            {props.activeTab === 0 &&
              props.userPhrases.map(phrase => (
                <Grid item xs={12} md={6} lg={4} xl={3} key={phrase.id_string}>
                  <Phrase
                    phrase={phrase}
                    disableUserLink
                    disableMenu={!isMyProfile}
                    onRequestDelete={handleRequestDelete}
                  />
                </Grid>
              ))}
            {props.activeTab === 1 &&
              props.userLikedPhrases.map(phrase => (
                <Grid item xs={12} md={6} lg={4} xl={3} key={phrase.id_string}>
                  <Phrase phrase={phrase} disableMenu />
                </Grid>
              ))}
            {((props.activeTab === 0 && props.userPhrases.length === 0) ||
              (props.activeTab === 1 &&
                props.userLikedPhrases.length === 0)) && (
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <SkeletonPhrase>
                  <Title>No phrases</Title>
                </SkeletonPhrase>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Root>
  );
}

export default withRouter(
  connect(
    state => ({
      signInUser: state.auth.signInUser,
      user: state.profile.user,
      userPhrases: state.profile.userPhrases,
      userLikedPhrases: state.profile.userLikedPhrases,
      activeTab: state.profile.activeTab
    }),
    {
      setActiveTab,
      resetProfile,
      requestFetchUser,
      requestDeletePhrase,
      requestFetchUserPhrases,
      requestFetchUserLikedPhrases
    }
  )(Profile)
);
