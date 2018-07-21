import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
};

export const authSuccess = (userId, idToken) => {
  console.log(userId, idToken);
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId: userId,
    idToken: idToken,
  }
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
};

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  }
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
};

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBWgR-hBg8yqTF-tnP_uX2pT-Mc9JhZ4eM';
    if(!isSignUp) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBWgR-hBg8yqTF-tnP_uX2pT-Mc9JhZ4eM';
    }
    axios.post(url, authData)
      .then(response => {
        console.log(response);
        dispatch(authSuccess(response.data.localId, response.data.idToken));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(error => {
      console.log(error);
      dispatch(authFail(error.response.data.error))
    })
  };
};