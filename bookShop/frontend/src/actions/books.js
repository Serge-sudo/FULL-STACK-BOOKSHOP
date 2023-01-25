import axios from 'axios';
import {
    GET_BOOK_LIST,
    GET_BOOKS_LIST_BY_IDS,
    GET_BOOK,
    MAKE_BOOK_CUT,
    GET_BESTSELLERS_LIST,
    GET_SEARCH_RESULTS,
    GET_BOOKS_LIST_BY_CATEGORY
} from "./types";
import fetchSync from "sync-fetch";

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';


export const setBooksCut = (first, last) => async dispatch => {
    dispatch({
        type: MAKE_BOOK_CUT,
        payload: [first, last]
    })
};


export const getBook = (id) => async dispatch => {

    let response = await fetch('/api/book/' + id,
        {
            method: 'GET'
        })
    let data = await response.json();
    if (response.status === 200) {
        dispatch({
            type: GET_BOOK,
            payload: data,

        })
    } else {
    }

};


export const getBooks = () => async dispatch => {

    let response = await fetch('/api/book/',
        {
            method: 'GET'
        })
    let data = await response.json();
    if (response.status === 200) {
        dispatch({
            type: GET_BOOK_LIST,
            payload: data,

        })
    } else {
    }

};


export const getBooksByIDS = (id_list) => async dispatch => {

    let response = await fetch('/api/book/',
        {
            method: 'GET'
        })
    let data = await response.json();
    if (response.status === 200) {
        dispatch({
            type: GET_BOOKS_LIST_BY_IDS,
            payload: data,
            bucketList: id_list

        })
    } else {
    }

};

export const getBestSellers = () => async dispatch => {

    let response = await fetch('/api/book/',
        {
            method: 'GET'
        })
    let data = await response.json();
    if (response.status === 200) {
        dispatch({
            type: GET_BESTSELLERS_LIST,
            payload: data,
        })
    } else {
    }

};

export const getSearchResults = (q) => async dispatch => {

    let response = await fetch('/api/book/',
        {
            method: 'GET'
        })
    let data = await response.json();
    if (response.status === 200) {
        dispatch({
            type: GET_SEARCH_RESULTS,
            payload: data,
            query: q
        })
    } else {
    }

};


export const getBooksByCategory = (category) => async dispatch => {

    let response = await fetch('/api/book/',
        {
            method: 'GET'
        })
    let data = await response.json();
    if (response.status === 200) {
        dispatch({
            type: GET_BOOKS_LIST_BY_CATEGORY,
            payload: data,
            category: category
        })
    } else {
    }

};