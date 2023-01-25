import {GET_USER_TOKEN, LOGIN, LOGOUT, SET_USER_TOKEN} from "./types";
const fetchSync = require('sync-fetch')
export const getToken = () => dispatch => {
    dispatch({
        type: GET_USER_TOKEN
    });
};

export const setToken = (new_token) => dispatch => {
    dispatch({
        type: SET_USER_TOKEN,
        payload: new_token
    });
};

export const login = (auth_token) => dispatch => {
    let response = fetchSync('/auth/users/me/',
        {
            method: 'GET',
            headers: {
                'Authorization': 'token ' + auth_token
            }
        })
    let data =  response.json();
    if (response.status === 200) {
        dispatch({
            type: LOGIN,
            token: auth_token,
            payload: data,

        })
        return true;
    } else {
        return false;
    }
};
export const logout = (auth_token) => async dispatch => {
    let response = await fetch('/auth/token/logout/',
        {
            method: 'POST',
            headers: {
                'Authorization': 'token ' + auth_token
            }
        })
    if (response.status === 204) {
        localStorage.removeItem('auth');
        dispatch({
            type: LOGOUT,
        })
    } else {
    }

}