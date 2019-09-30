/* eslint-disable no-extra-boolean-cast */
import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Paper from '@material-ui/core/Paper';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectFilteredHotels,
} from 'containers/App/selectors';
import H2 from 'components/H2';
import { Grid, FormControl, InputLabel, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IntegrationAutosuggest from '../../components/autoSuggestion';
import Filter from '../../components/Filter';
import CenteredSection from './CenteredSection';
import ListHotels from './ListHotels';
import Section from './Section';
import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername, changeSortBy } from './actions';
import { makeSelectUsername, makeSelectFindingLocations } from './selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'home';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const HomePage = ({ username, onSubmitForm, onHandleSort }) => {
  const classes = useStyles();
  const [sortBy, setSortBy] = useState({
    name: 'A to Z',
  });
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    if (username && username.trim().length > 0) onSubmitForm();
  }, []);

  const handleChange = sortByName => event => {
    onHandleSort(event.target.value);
  };

  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <div>
        <CenteredSection>
          <H2>Goquo Testing Project</H2>
        </CenteredSection>
        <Section>
          <H2>Find location</H2>
          {/* <Filter filter={filter} setFilterGroups={setFilterGroups}/> */}
          <Grid container xs={12}>
            <Grid item xs={12}>
              <Filter />
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">
                  Sort by Name
                </InputLabel>
                <Select
                  native
                  value={sortBy.sortBy}
                  onChange={handleChange('sortBy')}
                  inputProps={{
                    sortBy: true,
                    id: 'age-native-simple',
                  }}
                >
                  <option value>A to Z</option>
                  <option value={false}>Z to A</option>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <IntegrationAutosuggest />
          <Grid container xs={12} className="list-hotel-wrapper">
            <Grid item xs={6}>
              <ListHotels itemsPerPage={2} activePage={1} sortBy />
            </Grid>
          </Grid>
        </Section>
      </div>
    </article>
  );
};

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  hotels: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  findingLocations: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitLocation: PropTypes.func,
  onSubmitForm: PropTypes.func,
  onSubmitLocationForm: PropTypes.func,
  username: PropTypes.string,
  onChangeFindingLocations: PropTypes.func,
  onChangeUsername: PropTypes.func,
  onHandleSort: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  hotels: makeSelectFilteredHotels(),
  username: makeSelectUsername(),
  findingLocations: makeSelectFindingLocations(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onHandleSort: evt => dispatch(changeSortBy(evt)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
