import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import grey from 'material-ui/colors/grey';
import Grid from 'material-ui/Grid';
import Tabs, { Tab } from 'material-ui/Tabs';
import Avatar from 'material-ui/Avatar';
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
`;

const UserRoot = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
`;

const UserName = styled(Headline)`
  margin-left: 12px;
`;

const TabsContainer = styled.div`
  margin: 8px 0;
  background-color: ${grey[100]};
`;

const SkeletonPhrase = styled.div`
  padding: 12px 16px;
  height: 76px;
  border: 2px dotted ${grey[200]};
`;

class Profile extends React.Component {
  componentDidMount() {
    const { params } = this.props.match;
    const { user } = this.props;
    if (user && params.id_string !== user.id_string) this.props.resetProfile();
    this.props.requestFetchUser(params.id_string);
    this.props.requestFetchUserPhrases(params.id_string);
    this.props.requestFetchUserLikedPhrases(params.id_string);
  }

  componentDidUpdate(prevProps) {
    const { params } = this.props.match;
    const { params: prevParams } = prevProps.match;
    if (params.id_string !== prevParams.id_string) {
      this.props.resetProfile();
      this.props.requestFetchUser(params.id_string);
      this.props.requestFetchUserPhrases(params.id_string);
      this.props.requestFetchUserLikedPhrases(params.id_string);
    }
  }

  handleChange = (e, value) => {
    this.props.setActiveTab(value);
  };

  handleRequestDelete = phrase => {
    this.props.requestDeletePhrase(phrase.id_string);
  };

  isMyProfile = () => {
    const { signInUser, user } = this.props;
    if (signInUser && user) return signInUser.id_string === user.id_string;
    else return undefined;
  };

  render() {
    const { user, userPhrases, userLikedPhrases, activeTab } = this.props;

    const isMyProfile = this.isMyProfile();

    return (
      <Root>
        <Grid container justify="center">
          <Grid item xs={12} sm={10}>
            <UserRoot>
              <Avatar src={user && user.photo_url} />
              <UserName>{user && user.display_name}</UserName>
            </UserRoot>
            <TabsContainer>
              <Tabs
                value={activeTab}
                indicatorColor={activeTab === 0 ? 'primary' : 'secondary'}
                textColor={activeTab === 0 ? 'primary' : 'secondary'}
                onChange={this.handleChange}
              >
                <Tab label="Phrases" />
                <Tab label="Liked" />
              </Tabs>
            </TabsContainer>
          </Grid>
          <Grid item xs={12} sm={10}>
            <Grid container spacing={8}>
              {activeTab === 0 &&
                userPhrases.map(phrase => (
                  <Grid item xs={12} md={6} lg={4} key={phrase.id_string}>
                    <Phrase
                      phrase={phrase}
                      disableUserLink
                      disableMenu={!isMyProfile}
                      onRequestDelete={this.handleRequestDelete}
                    />
                  </Grid>
                ))}
              {activeTab === 0 &&
                userPhrases.length === 0 && (
                  <Grid item xs={12} md={6} lg={4}>
                    <SkeletonPhrase>
                      <Title>No phrases</Title>
                    </SkeletonPhrase>
                  </Grid>
                )}
              {activeTab === 1 &&
                userLikedPhrases.map(phrase => (
                  <Grid item xs={12} md={6} lg={4} key={phrase.id_string}>
                    <Phrase phrase={phrase} disableMenu />
                  </Grid>
                ))}
              {activeTab === 1 &&
                userLikedPhrases.length === 0 && (
                  <Grid item xs={12} md={6} lg={4}>
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
