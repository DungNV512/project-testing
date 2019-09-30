/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  LOAD_REPOS,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR,
  LOAD_HOTELS,
  LOAD_HOTELS_SUCCESS,
  LOAD_HOTELS_ERROR,
  LOAD_LOCATIONS,
  LOAD_LOCATIONS_SUCCESS,
  LOAD_LOCATIONS_ERROR,
  FILTER_HOTELS_BY_CONDITION,
  LOAD_SORT_BY,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  hotels: [],
  filteredHotels: [],
  findingLocations: [],
  sortByName: true,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_REPOS:
        draft.loading = true;
        draft.error = false;
        draft.userData.repositories = false;
        break;

      case LOAD_REPOS_SUCCESS:
        draft.userData.repositories = action.repos;
        draft.loading = false;
        draft.currentUser = action.username;
        break;

      case LOAD_REPOS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case LOAD_HOTELS:
        draft.loading = true;
        draft.error = false;
        draft.hotels = false;
        draft.filteredHotels = false;
        break;

      case LOAD_HOTELS_SUCCESS:
        draft.hotels = action.hotels;
        draft.filteredHotels = action.hotels;
        draft.loading = false;
        break;

      case LOAD_HOTELS_ERROR:
        // suppose as succesful
        draft.hotels = action.hotels;
        draft.filteredHotels = action.hotels;
        draft.error = action.error;
        draft.loading = false;
        break;

      case LOAD_LOCATIONS:
        draft.loading = true;
        draft.error = false;
        draft.findingLocations = action.payload;
        break;

      case LOAD_LOCATIONS_SUCCESS:
        draft.findingLocations = action.findingLocations;
        draft.loading = false;
        break;

      case LOAD_LOCATIONS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case LOAD_SORT_BY:
        draft.sortByName = action.payload.sortBy;
        break;

      case FILTER_HOTELS_BY_CONDITION:
        // eslint-disable-next-line no-case-declarations
        const condition = action.payload.filterBy;
        draft.filteredHotels = action.hotels.filter(hotel => {
          if (condition === 'star') return hotel.stars > 3;
          if (condition === 'score') return hotel.trustYouScore > 4;
          return hotel;
        });
        break;
    }
  });

export default appReducer;
