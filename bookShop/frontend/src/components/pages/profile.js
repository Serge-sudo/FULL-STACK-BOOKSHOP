import React, {Component, Fragment} from 'react';
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import {connect} from "react-redux";
import {getDelivery} from "../../actions/delivery";
import {getBooksByIDS} from "../../actions/books"

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
        this.props.getDelivery(this.props.user_info.id).then(() => {
            let ids = this.props.delivery.map(delivery => delivery.book_id)
            this.props.getBooksByIDS(ids).then(() => {
                this.setState({loaded: true})
            })
        });
    }

    render() {
        return (
            <Fragment>
                <Header/>
                {this.props.user_info ?
                    <div className='main container'>
                        <div className="container">
                             <h1 id="category-title">Profile</h1>
                            <div className="main-body">


                                <div className="row gutters-sm">
                                    <div className="col-md-4 mb-4">
                                        <div className="card-profile">
                                            <div className="card-body">
                                                <div
                                                    className="d-flex flex-column align-items-center text-center mb-4">
                                                    <img
                                                        src={this.props.user_info.img}
                                                        alt="Admin" className="rounded-circle" width={150}/>
                                                    <div className="mt-3">
                                                        <h4>{this.props.user_info.name + " " + this.props.user_info.last_name}</h4>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-profile mb-3">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Full Name</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        {this.props.user_info.name + " " + this.props.user_info.last_name}
                                                    </div>
                                                </div>
                                                <hr/>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Email</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        {this.props.user_info.email}
                                                    </div>
                                                </div>
                                                <hr/>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Birthday</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        {this.props.user_info.date_of_birth}
                                                    </div>
                                                </div>
                                                <hr/>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-0">Address</h6>
                                                    </div>
                                                    <div className="col-sm-9 text-secondary">
                                                        {this.props.user_info.address}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="row gutters-sm">
                                    <div className="col mb-3">
                                        <div className="card-profile h-100">

                                            <div className="card-body">

                                                <h3 style={{textAlign: 'center'}}>Orders</h3>


                                                <div className="container mt-5">
                                                    <div className="d-flex justify-content-center row">
                                                        <div className="col-md-10">
                                                            <div className="rounded">
                                                                <div
                                                                    className="table-responsive table-borderless">
                                                                     <a id="orders"></a>
                                                                    {this.state.loaded ?
                                                                        <table className="table">
                                                                            <thead>
                                                                            <tr>
                                                                                <th className="text-center">
                                                                                    <div className="toggle-btn">
                                                                                        <div
                                                                                            className="inner-circle"/>
                                                                                    </div>
                                                                                </th>
                                                                                <th>Order #</th>
                                                                                <th>Book</th>
                                                                                <th>status</th>
                                                                                <th>Total</th>
                                                                                <th>Created</th>

                                                                            </tr>
                                                                            </thead>
                                                                            <tbody className="table-body">

                                                                            {

                                                                                this.props.delivery.map(delivery => (
                                                                                    <Fragment key={delivery.id}>

                                                                                        <tr className="cell-1">
                                                                                            <td className="text-center">
                                                                                                <div
                                                                                                    className="toggle-btn">
                                                                                                    <div
                                                                                                        className="inner-circle"/>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td>{delivery.id}</td>

                                                                                            <td style={{overflow: 'hidden'}}>
                                                                                                <a href={"/books/" + delivery.book_id}>
                                                                                                    {this.props.AllBooks.filter(book => book.id === delivery.book_id)[0].name}
                                                                                                </a>
                                                                                            </td>

                                                                                            <td><span
                                                                                                className="badge badge-success">{delivery.status}</span>
                                                                                            </td>
                                                                                            <td>${delivery.cost}</td>
                                                                                            <td>{delivery.Order_date}</td>
                                                                                        </tr>

                                                                                    </Fragment>

                                                                                ))
                                                                            }


                                                                            </tbody>
                                                                        </table>
                                                                        : <Fragment></Fragment>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                    : ""}
                <Footer/>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user_info: state.auth.user_info,
        token: state.auth.token,
        delivery: state.delivery.delivery,
        AllBooks: state.books.AllBooks
    }
};
export default connect(mapStateToProps, {getDelivery, getBooksByIDS})(Profile);