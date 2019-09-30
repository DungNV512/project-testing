/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.home || initialState;
const selectFindingLocations = state => state.findingLocations || initialState;

const makeSelectUsername = () =>
  createSelector(
    selectHome,
    homeState => homeState.username,
  );

const makeSelectFindingLocations = () =>
  createSelector(
    selectFindingLocations,
    findingLocationsState => findingLocationsState.findingLocations,
  );

export {
  selectHome,
  makeSelectUsername,
  selectFindingLocations,
  makeSelectFindingLocations,
};
