import React, {Component, Fragment} from 'react';
import Book from "./Book";
import {connect} from "react-redux";
import {setBooksCut} from "../../actions/books";

class List extends Component {

    constructor(props) {
        super(props);
        this.currentPage = parseInt(this.props.page) ? parseInt(this.props.page) : 1;
        this.BooksPerPage = 12;
        this.cnt = Math.ceil(this.props.AllBooks.length / this.BooksPerPage);
        if (this.currentPage <= 0 || this.currentPage > this.cnt) {
            this.currentPage = 1
        }
        this.indicators = [...Array(this.cnt).keys()].slice(Math.max(this.currentPage - 4, 0), Math.min(this.cnt, this.currentPage + 3));
        this.updateList();
    }

    updateList() {
        this.lastBookIndex = (this.currentPage) * this.BooksPerPage;
        this.firstBookIndex = (this.currentPage - 1) * (this.BooksPerPage);
        this.props.setBooksCut(this.firstBookIndex, this.lastBookIndex);
    }

    render() {
        return (
            <Fragment>
                <main className="page-content">
                    {this.props.CurrentBooks.map(book => (
                        <Book key={book.id} data={book}/>
                    ))}
                </main>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className={"page-item" + (this.currentPage === 1 ? " disabled" : "")}>
                            <a className="page-link" href={"?page=" + (this.currentPage - 1) + "#books"}>Previous</a>
                        </li>
                        {this.indicators.map(ind => (
                            <Fragment key={ind}>
                                <li className={"page-item" + (this.currentPage === (ind+1) ? " active" : "")}><a className="page-link"
                                                             href={"?page=" + (ind + 1) + "#books"}>{ind + 1}</a>
                                </li>
                            </Fragment>

                        ))}
                        <li className={"page-item" + (this.currentPage === this.cnt ? " disabled" : "")}>
                            <a className="page-link" href={"?page=" + (this.currentPage + 1) + "#books"}>Next</a>
                        </li>
                    </ul>
                </nav>
            </Fragment>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        AllBooks: state.books.AllBooks,
        CurrentBooks: state.books.CurrentBooks
    }
};
export default connect(mapStateToProps, {setBooksCut})(List);