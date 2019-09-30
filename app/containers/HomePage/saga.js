import { call, put, select, takeLatest, all, fork } from 'redux-saga/effects';
import {
  findingLocationsLoaded,
  findingLocationsLoadingError,
  hotelsLoaded,
  hotelsLoadingError,
} from 'containers/App/actions';
import request from 'utils/request';
import { makeSelectHotels } from '../App/selectors';
import {
  CHANGE_FINDING_LOCATION,
  CHANGE_FILTER,
  CHANGE_SORTBY,
} from './constants';
import {
  LOAD_HOTELS,
  FILTER_HOTELS_BY_CONDITION,
  LOAD_SORT_BY,
} from '../App/constants';

export function* getFindingLocations() {
  // https://{host}/destination/suggess
  // eslint-disable-next-line func-names
  yield takeLatest(CHANGE_FINDING_LOCATION, function*(payload) {
    const location = payload.findingLocation;
    const requestURL = `https://www.airbnb.com/api/v2/autocompletes?country=VN&key=d306zoyjsyarp7ifhu67rjxn52tv0t20&language=en&locale=en&num_results=5&user_input=${location}&api_version=1.1.9&vertical_refinement=homes&region=-1&options=should_show_stays`;
    try {
      const findingLocations = yield call(request, requestURL);
      yield put(findingLocationsLoaded(findingLocations));
    } catch (err) {
      yield put(findingLocationsLoadingError(err));
    }
  });
}

export function* getHotelsFilterByCondition() {
  // eslint-disable-next-line func-names
  yield takeLatest(CHANGE_FILTER, function*(payload) {
    const hotels = yield select(makeSelectHotels());
    yield put({
      type: FILTER_HOTELS_BY_CONDITION,
      hotels,
      payload,
    });
  });
}

export function* sortHotelsByName() {
  // eslint-disable-next-line func-names
  yield takeLatest(CHANGE_SORTBY, function*(payload) {
    yield put({
      type: LOAD_SORT_BY,
      payload,
    });
  });
}

export function* getHotels() {
  // eslint-disable-next-line func-names
  yield takeLatest(LOAD_HOTELS, function*(payload) {
    // sample query
    const body = {
      query: {
        location: 'hanoi, vietnam',
        minStar: 0,
        maxStar: 5,
        minPrice: 0,
        maxPrice: 1000000,
      },
      sorting: {
        sortBy: 'name',
        desc: false,
      },
      paging: {
        take: 20,
        skip: 0,
      },
    };

    const formData = new FormData();
    formData.append('json', JSON.stringify(body));

    const options = {
      method: 'post',
      body: formData,
    };
    const requestURL = 'https://{host}/hotels/query_basic';

    try {
      const hotels = yield call(request, requestURL, options);
      yield put(hotelsLoaded(hotels));
    } catch (err) {
      yield put(hotelsLoadingError(err));
    }
  });
}

export default function* auth() {
  yield all([
    fork(getHotels),
    fork(getFindingLocations),
    fork(getHotelsFilterByCondition),
    fork(sortHotelsByName),
  ]);
}
