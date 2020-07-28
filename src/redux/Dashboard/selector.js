/*
 *
 * Dashboard selectors
 *
 */

 import { createSelector } from 'reselect';

const BASE = 'dashboard';

const userNameGetter = (state) => {
  return state[BASE].userName
} 

const makeSelectDashboard = () => createSelector(
  userNameGetter(),
);

export default makeSelectDashboard;

export {
  userNameGetter,
};
