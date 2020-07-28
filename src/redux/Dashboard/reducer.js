/*
 *
 * Dashboard reducers
 *
 */

import * as CONST from './constant';

const initialState = {
  userName: '',
}

function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case CONST.SET_USER_NAME:
      return {
        ...state,
        userName: action.userName,
      };
    default:
      return state;
  }
}

export default dashboardReducer;
