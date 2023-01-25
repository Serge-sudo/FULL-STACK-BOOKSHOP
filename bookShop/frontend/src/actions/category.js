import axios from 'axios';
import {GET_CATEGORIES_LIST} from "./types";

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';


export const getCategories = () => dispatch => {
    axios.get('/api/genres/').then(result => {
        dispatch({
            type: GET_CATEGORIES_LIST,
            payload: result.data,

        })
    }).catch(error => console.log(error));
};