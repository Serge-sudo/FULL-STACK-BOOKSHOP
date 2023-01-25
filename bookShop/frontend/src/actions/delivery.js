import {GET_DELIVERY} from "./types";

export const getDelivery = (user_id) => async dispatch => {

    let response = await fetch('/api/delivery/' + user_id,
        {
            method: 'GET'
        })
    let data = await response.json();
    if (response.status === 200) {
        dispatch({
            type: GET_DELIVERY,
            payload: data,
        })
    } else {
    }
};

