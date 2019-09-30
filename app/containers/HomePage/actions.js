import {
  CHANGE_USERNAME,
  CHANGE_FINDING_LOCATION,
  CHANGE_FILTER,
  CHANGE_SORTBY,
} from './constants';

export function changeUsername(username) {
  return {
    type: CHANGE_USERNAME,
    username,
  };
}

export function changeFindingLocations(findingLocation) {
  return {
    type: CHANGE_FINDING_LOCATION,
    findingLocation,
  };
}

export function changeFilter(filterBy) {
  return {
    type: CHANGE_FILTER,
    filterBy,
  };
}

export function changeSortBy(sortBy) {
  return {
    type: CHANGE_SORTBY,
    sortBy,
  };
}
