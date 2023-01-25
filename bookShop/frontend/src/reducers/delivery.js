import {GET_DELIVERY} from "../actions/types";

const initialState ={
    delivery: []
};

export default function (state = initialState,action){
    switch (action.type){
        case GET_DELIVERY:
            return {
                ...state,
                delivery:action.payload
            };
        default:
            return state;

    }
}