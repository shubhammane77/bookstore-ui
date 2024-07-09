import UserReducer from './UserReducer';
import {
  LOGOUT,
  LOGIN
} from '../../constants/ActionTypes';


describe('UserReducer', () => {
  let initialState;
  beforeEach(() => {
    // Initial state
    initialState = {
      userId: 0,
      userName: '',
      token: ''
    };
  })
  it('should return the initial state', () => {
    expect(UserReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle LOGIN', () => {
    const loginAction = { type: LOGIN, payload: { userId: 1, userName: 'test', token: 'ABC' } };
    const expectedState = {
      userId: 1, userName: 'test', token: 'ABC'
    };

    expect(UserReducer(initialState, loginAction)).toEqual(expectedState);
  });

  it('should handle LOGOUT', () => {
    const logoutAction = { type: LOGOUT };
    const stateWithUserInfo = {
      userId: 1,
      userName: 'test',
      token: 'ABC'
    };

    expect(UserReducer(stateWithUserInfo, logoutAction)).toEqual(initialState);
  });
});