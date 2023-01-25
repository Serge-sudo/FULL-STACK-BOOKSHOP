import {combineReducers} from 'redux';
import books from './books';
import auth from "./auth";
import delivery from "./delivery";
import carousels from "./carousels";
import categories from "./category";
export default  combineReducers(
    {
        books,
        carousels,
        auth,
        delivery,
        categories,
    }
);