import produce from 'immer';
import { CHANGE_FINDING_LOCATION } from './constants';

// The initial state of the App
export const initialState = {
  findingLocation: '',
};

/* eslint-disable default-case, no-param-reassign */
const findingLocationReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_FINDING_LOCATION:
        draft.findingLocation = action.findingLocation.replace(/@/gi, '');
        break;
    }
  });

export default findingLocationReducer;
