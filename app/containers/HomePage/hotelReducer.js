import produce from 'immer';
import { LOAD_HOTELS_LIST } from './constants';

// The initial state of the App
export const initialState = {
  hotels: [],
};

/* eslint-disable default-case, no-param-reassign */
const hotelReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_HOTELS_LIST:
        // Delete prefixed '@' from the github username
        draft.hotels = action.hotels.replace(/@/gi, '');
        break;
    }
  });

export default hotelReducer;
