import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import grey from '@material-ui/core/colors/grey';
import Grid from '@material-ui/core/Grid';
import Headline from '~/components/Headline';
import Phrase from '~/components/Phrase';
import { requestFetchRecentPhrases } from '~/thunks/home';

const Root = styled.div`
  padding: 24px 0;
  overflow-x: hidden;
`;

const StyledHeadline = styled(Headline)`
  padding: 8px 0;
`;

function Home(props) {
  useEffect(() => {
    props.requestFetchRecentPhrases();
  }, []);

  return (
    <Root>
      <Grid container spacing={8} justify="center">
        <Grid item xs={10}>
          <StyledHeadline>Recent</StyledHeadline>
        </Grid>
        <Grid item xs={10}>
          <Grid container spacing={8}>
            {props.recentPhrases.map(phrase => (
              <Grid item xs={12} md={6} lg={4} xl={3} key={phrase.id_string}>
                <Phrase phrase={phrase} disableMenu />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Root>
  );
}

export default connect(
  state => ({
    recentPhrases: state.home.recentPhrases
  }),
  { requestFetchRecentPhrases }
)(Home);
