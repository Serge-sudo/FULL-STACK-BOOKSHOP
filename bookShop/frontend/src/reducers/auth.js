import {LOGIN, GET_USER_TOKEN, SET_USER_TOKEN, LOGOUT} from "../actions/types";
import jwtDecode from "jwt-decode";

const initialState = {
    user_info: null,
    token: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user_info: action.payload,
                token: action.token
            };
        case LOGOUT:
            return {
                ...state,
                user_info: null,
                token: null
            };
        case GET_USER_TOKEN:
            return {
                ...state.token
            };
        case SET_USER_TOKEN:
            return {
                ...state,
                token: action.payload
            };
        default:
            return state;

    }
}