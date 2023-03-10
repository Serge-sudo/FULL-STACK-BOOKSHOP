import {GET_CATEGORIES_LIST} from "../actions/types";

const initialState ={
    categories: []
};

export default function (state = initialState,action){
    switch (action.type){
        case GET_CATEGORIES_LIST:
            return {
                ...state,
                categories:action.payload
            };
        default:
            return state;

    }
}