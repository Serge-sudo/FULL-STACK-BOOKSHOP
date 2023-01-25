import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {login, logout, setToken} from "../../actions/auth";
import {getCategories} from "../../actions/category";

export class Header extends Component {
    constructor(props) {
        super(props);
        this.query_link = (e) => {
            e.preventDefault();
            let query = document.getElementById("search").value;
            if (!query)
                return;
            location.href = "/search/" + query;
        };
        this.props.getCategories();
    }

    render() {
        return (
            <header>
                <div className="p-3 text-center text-white" style={{backgroundColor: '#131921'}}>
                    <div className="container">
                        <a href="/"><img style={{width: '40%'}}
                                         src="/media/images/website_logo.webp"
                                         alt=""/></a>
                        <div className="row">
                            <div
                                className="col-md-4 d-flex justify-content-center justify-content-md-start mb-md-0" style={{alignItems:'center'}}>

                                <a className="nav-link" href="#" role="button" data-mdb-toggle="sidenav"
                                   data-mdb-target="#sidenav-1" aria-controls="#sidenav-1" aria-haspopup="true">
                                    <i className="fas fa-bars me-1"/>
                                </a>
                            </div>
                            <div className="col-md-4">
                                <form onSubmit={this.query_link}
                                      className="d-flex input-group w-auto my-auto mb-3 mb-md-0">
                                    <input autoComplete="off" id="search" type="search" className="form-control rounded"
                                           placeholder="Search"/>
                                    <label style={{cursor: "pointer"}}>
                                    <span className="input-group-text border-0 d-none d-lg-flex"><i
                                        className="fas fa-search text-white"/></span>
                                        <input type="submit" style={{display: "none"}}/>
                                    </label>
                                </form>
                            </div>
                            <div
                                className="col-md-4 d-flex justify-content-center justify-content-md-end align-items-center">
                                <div className="d-flex">
                                    {this.props.user_info ?
                                        <Fragment>
                                            <a className="text-reset me-3" href="/bucket">
                                                <span><i className="fas fa-shopping-cart"/></span>
                                                <span id={'bucket_ind'}
                                                    className="badge rounded-pill badge-notification bg-danger">{this.props.user_info.bucket.length}</span>
                                            </a>

                                            <div className="dropdown">
                                                <a className="text-reset dropdown-toggle d-flex align-items-center hidden-arrow"
                                                   href="#" id="navbarDropdownMenuLink" role="button"
                                                   data-mdb-toggle="dropdown"
                                                   aria-expanded="false">
                                                    <img src={this.props.user_info.img}
                                                         className="rounded-circle" height={30} alt="" loading="lazy"/>
                                                </a>
                                                <ul className="dropdown-menu dropdown-menu-end"
                                                    aria-labelledby="navbarDropdownMenuLink">
                                                    <li><a className="dropdown-item"
                                                           href="/profile">{this.props.user_info.name}' Profile</a></li>
                                                    <li><a className="dropdown-item" href="/settings">Settings</a></li>
                                                    <li><a className="dropdown-item" onClick={() => {
                                                        this.props.logout(this.props.token)
                                                    }}>Logout</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </Fragment>
                                        :
                                        <form action="/login">
                                            <button className="btn btn-outline-secondary login-button" type="submit" >Sign In</button>
                                        </form>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Jumbotron */}
                {/* Navbar */}
                <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: '#232f3e'}}>
                    {/* Container wrapper */}
                    <div className="container justify-content-center justify-content-md-between nav_panel">
                        {/* Left links */}
                        <ul className="navbar-nav flex-row my_nav">
                            <li className="nav-item me-2 me-lg-0 d-none d-md-inline-block">
                                <a className="nav-link" href="/">Home</a>
                            </li>
                            <li className="nav-item me-2 me-lg-0 d-none d-md-inline-block">
                                <a className="nav-link" href="/bestsellers">Best sellers</a>
                            </li>
                            <li className="nav-item me-2 me-lg-0 d-none d-md-inline-block">
                                <a className="nav-link" href="/aboutus">About us</a>
                            </li>
                            <li className="nav-item me-2 me-lg-0 d-none d-md-inline-block">
                                <a className="nav-link" href="/contacts">Contact</a>
                            </li>
                        </ul>
                    </div>
                    {/* Container wrapper */}
                </nav>
                {/* Navbar */}
                {/* Sidenav */}
                <div id="sidenav-1" className="sidenav" role="navigation" data-mdb-hidden="true"
                     data-mdb-accordion="true">
                    <ul className="sidenav-menu">
                        <li className="sidenav-item">
                            <a className="sidenav-link"><i className="fas fa-layer-group pe-3"/><span>Categories</span></a>
                            <ul className="sidenav-collapse show">
                                {this.props.categories.map(category => (
                                    <Fragment key={category.genre}>
                                        <li className="sidenav-item">
                                            <a className="sidenav-link"
                                               href={"/category/" + category.genre}>{category.genre}</a>
                                        </li>
                                    </Fragment>

                                ))}
                            </ul>
                        </li>

                    </ul>
                </div>
                {/* Sidenav */}
            </header>

        )
    }
}


const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        user_info: state.auth.user_info,
        categories: state.categories.categories
    }
};
export default connect(mapStateToProps, {login, logout, setToken, getCategories})(Header);