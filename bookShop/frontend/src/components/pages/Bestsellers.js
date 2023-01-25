import React, {Component, Fragment, useState} from 'react';
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Carousel from "../shop/Carousel";
import {useSearchParams} from "react-router-dom";
import List from "../shop/List";
import {getBestSellers} from "../../actions/books";
import {connect} from "react-redux";


class Bestsellers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
        const [searchParams] = this.props.params;
        this.page = searchParams.get('page') ? searchParams.get('page') : 0;
        this.props.getBestSellers().then(() => this.setState({loaded: true}));
    }

    render() {
        return (
            <Fragment>
                <Header/>
                <div className='main container'>
                    <h1 id="category-title"> Best Sellers</h1>


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

export default connect(mapStateToProps, {getBestSellers})((props) => (
    <Bestsellers
        {...props}
        params={useSearchParams()}
    />
));

