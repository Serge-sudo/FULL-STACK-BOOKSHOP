import {GET_CAROUSEL_LIST} from "../actions/types";

const initialState ={
    carousels: []
};

export default function (state = initialState,action){
    switch (action.type){
        case GET_CAROUSEL_LIST:
            return {
                ...state,
                carousels:action.payload
            };
        default:
            return state;

    }
}