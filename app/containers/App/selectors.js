/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;
const selectFindingLocation = state => state.findingLocation || '';
const selectRouter = state => state.router;

const makeSelectCurrentUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.currentUser,
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

const makeSelectRepos = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userData.repositories,
  );

const makeSelectHotels = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.hotels,
  );

const makeSelectSortBy = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.sortByName,
  );

const makeSelectFilteredHotels = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.filteredHotels,
  );

const makeSelectFindingLocations = () =>
  createSelector(
    selectFindingLocation,
    findingLocationState => findingLocationState.findingLocation,
  );

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectSuggestions = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.findingLocations,
  );

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectHotels,
  makeSelectFindingLocations,
  makeSelectSuggestions,
  makeSelectRepos,
  makeSelectLocation,
  makeSelectFilteredHotels,
  makeSelectSortBy,
};
