import React, {Component, Fragment, useState} from 'react';
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Carousel from "../shop/Carousel";
import {useParams, useSearchParams} from "react-router-dom";
import List from "../shop/List";
import {getSearchResults} from "../../actions/books";
import {connect} from "react-redux";


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
        this.query = this.props.pageParams.q;
        const [searchParams] = this.props.params;
        this.page = searchParams.get('page') ? searchParams.get('page') : 0;
        this.props.getSearchResults(this.query).then(() => {
            this.setState({loaded: true})
        });
    }

    render() {
        return (
            <Fragment>
                <Header/>
                <div className='main container'>
                    <h1 id="category-title">Search Results for "{this.query}"</h1>

                    <span id="books"></span>
                    {this.state.loaded ?
                        <List page={this.page}/>
                        :
                        <Fragment></Fragment>
                    }
                </div>
                <Footer/>
            </Fragment>


        )
    }
}

const mapStateToProps = (state) => {
    return {
        AllBooks: state.books.AllBooks,
    }
};

export default connect(mapStateToProps, {getSearchResults})((props) => (
    <Search
        {...props}
        params={useSearchParams()}
        pageParams={useParams()}
    />
));

