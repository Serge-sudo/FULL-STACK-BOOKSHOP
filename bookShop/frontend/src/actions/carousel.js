import axios from 'axios';
import {GET_CAROUSEL_LIST} from "./types";

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';


export const getCarousels = () => dispatch => {
    axios.get('/api/carousel/').then(result => {
        dispatch({
            type: GET_CAROUSEL_LIST,
            payload: result.data,

        })
    }).catch(error => console.log(error));
};