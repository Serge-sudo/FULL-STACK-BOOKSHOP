import React, {Component, Fragment} from 'react';
import {createRoot} from "react-dom/client";
import Home from './pages/home'
import Login from './pages/login'
import {BrowserRouter, Routes, Route, Navigate, useParams} from 'react-router-dom'
import Authorization from "../utils/Authorization.js";
import {Provider} from "react-redux";
import store from '../store';
import Register from "./pages/register";
import PrivateRoutes from "../utils/PrivateRoutes";
import Bucket from "./pages/bucket";
import Contact from "./pages/contact";
import AboutUs from "./pages/aboutus";
import Profile from "./pages/profile";
import {login} from "../actions/auth";
import BookPage from "./pages/bookPage";
import Bestsellers from "./pages/Bestsellers";
import Search from "./pages/search";
import Settings from "./pages/settings";
import Category from "./pages/category";


class App extends Component {
    constructor(props) {
        super(props);
        let token = localStorage.getItem('auth');
        if (!token) return;
        token = JSON.parse(token).auth_token;
        if (!token) return;
        let res = store.dispatch(login(token));
        if (!res) localStorage.removeItem('auth');
    }


    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route element={<Home/>} path="/" exact/>
                        <Route element={<Contact/>} path="/contacts" exact/>
                        <Route element={<AboutUs/>} path="/aboutus" exact/>
                        <Route element={<BookPage/>} path="/books/:id" exact/>
                        <Route element={<Bestsellers/>} path="/bestsellers" exact/>
                        <Route element={<Search/>} path="/search/:q" exact/>
                        <Route element={<Category/>} path="/category/:category" exact/>
                        <Route path="/login" element={<Authorization Component={<Login/>}/>} exact/>
                        <Route path="/register" element={<Authorization Component={<Register/>}/>} exact/>
                        <Route path="/settings" element={<PrivateRoutes Component={<Settings/>}/>} exact/>
                        <Route path="/bucket" element={<PrivateRoutes Component={<Bucket/>}/>} exact/>
                        <Route path="/profile" element={<PrivateRoutes Component={<Profile/>}/>} exact/>
                    </Routes>
                </BrowserRouter>
            </Provider>


        )
    }
}

const root = createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
    <App/>
    // </React.StrictMode>
);
