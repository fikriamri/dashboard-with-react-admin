/*
 *
 * Dashboard actions
 *
 */
import * as CONST from './constant';

export const setUserName = (userName) => (
  { type: CONST.SET_USER_NAME, userName}
)
