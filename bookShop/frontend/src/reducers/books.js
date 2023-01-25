import {
    GET_BOOK,
    GET_BOOKS_LIST_BY_IDS,
    GET_BOOK_LIST,
    MAKE_BOOK_CUT,
    GET_BESTSELLERS_LIST,
    GET_SEARCH_RESULTS, GET_BOOKS_LIST_BY_CATEGORY
} from "../actions/types";
import {act} from "react-dom/test-utils";

const initialState = {
    AllBooks: [],
    CurrentBooks: []

};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_BOOK_LIST:
            return {
                ...state,
                AllBooks: action.payload
            };
        case MAKE_BOOK_CUT:
            return {
                ...state,
                CurrentBooks: Object.entries(state.AllBooks).slice(action.payload[0], action.payload[1]).map(entry => entry[1]),
            }
        case GET_BOOK:
            return {
                ...state,
                CurrentBooks: action.payload
            }
        case GET_BESTSELLERS_LIST:
            const best_sellers = []
            for (let num in action.payload) {
                if (action.payload[num].isBestSeller) {
                    best_sellers.push(action.payload[num])
                }
            }
            return {
                ...state,
                AllBooks: best_sellers
            }
        case GET_BOOKS_LIST_BY_CATEGORY:
            const booksByCategory = []
            for (let num in action.payload) {
                if (action.payload[num].genre.includes(action.category)) {
                    booksByCategory.push(action.payload[num])
                }
            }
            return {
                ...state,
                AllBooks: booksByCategory
            }
        case GET_SEARCH_RESULTS:
            const searchResults = []
            for (let num in action.payload) {
                const key_list = action.query.toLowerCase().split(' ');
                for (let val of key_list) {
                    if (action.payload[num].name.toLowerCase().includes(val)) {
                        searchResults.push(action.payload[num])
                    }
                }
            }
            const uniq_res = [...new Set(searchResults)];
            return {
                ...state,
                AllBooks: uniq_res
            }
        case GET_BOOKS_LIST_BY_IDS:
            const new_books = []
            for (let num in action.payload) {
                if (action.bucketList.includes(action.payload[num].id)) {
                    new_books.push(action.payload[num])
                }
            }
            return {
                ...state,
                AllBooks: new_books
            }


        default:
            return state;

    }
}