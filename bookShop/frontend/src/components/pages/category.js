import React, {Component, Fragment, useState} from 'react';
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import {useParams, useSearchParams} from "react-router-dom";
import List from "../shop/List";
import {getBooksByCategory} from "../../actions/books";
import {connect} from "react-redux";


class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
        this.category = this.props.pageParams.category;
        const [searchParams] = this.props.params;
        this.page = searchParams.get('page') ? searchParams.get('page') : 0;
        this.props.getBooksByCategory(this.category).then(() => this.setState({loaded: true}));
    }

    render() {
        return (
            <Fragment>
                <Header/>
                <div className='main container'>
                     <h1 id="category-title">Genre: {this.category}</h1>
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

export default connect(mapStateToProps, {getBooksByCategory})((props) => (
    <Category
        {...props}
        params={useSearchParams()}
        pageParams={useParams()}
    />
));

