import get from 'lodash.get';
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
} from './constants';
import sample from '../../helpers/sampleData';
export function loadRepos() {
  return {
    type: LOAD_REPOS,
  };
}

export function reposLoaded(repos, username) {
  return {
    type: LOAD_REPOS_SUCCESS,
    repos,
    username,
  };
}

export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}

export function loadHotels(hotels) {
  return {
    type: LOAD_HOTELS,
    hotels,
  };
}

export function hotelsLoaded(response) {
  // fake response from sample data
  const data = get(sample, 'data', []);
  return {
    type: LOAD_HOTELS_SUCCESS,
    hotels: data,
  };
}

export function hotelsLoadingError(error) {
  const data = get(sample, 'data', []);
  return {
    type: LOAD_HOTELS_ERROR,
    error,
    hotels: data,
  };
}
export function loadfindingLocations(payload) {
  return {
    type: LOAD_LOCATIONS,
    payload,
  };
}

export function findingLocationsLoaded(payload) {
  const findingLocations = get(payload, 'autocomplete_terms', []);
  return {
    type: LOAD_LOCATIONS_SUCCESS,
    findingLocations,
  };
}

export function findingLocationsLoadingError(error) {
  return {
    type: LOAD_LOCATIONS_ERROR,
    error,
  };
}
