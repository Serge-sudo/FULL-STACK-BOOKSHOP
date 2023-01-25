import React, {Component, Fragment} from 'react';
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import {useSearchParams} from "react-router-dom";
import List from "../shop/List";
import {getBooksByIDS} from "../../actions/books";
import {connect} from "react-redux";
import {login} from "../../actions/auth";
import Toasts from "../shop/Toasts";

class Bucket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            totalPrice: 0,
        };
        this.shipmentCost = 10
        this.props.getBooksByIDS(this.props.user_info.bucket).then(() => {
            this.setState({totalPrice: this.props.AllBooks.map((book) => book.price + this.shipmentCost).reduce((a, b) => a + b, 0)});
            this.setState({loaded: true})
        });
        this.remove = async (e) => {
            e.preventDefault();
            await this.props.login(this.props.token); //Updating information
            let response = await fetch('/auth/users/me/',
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'token ' + this.props.token
                    },
                    body: JSON.stringify({

                        'bucket': this.props.user_info.bucket.filter(item => item !== parseInt(e.target.id))
                    })
                })
            let data = await response.json();
            if (response.status === 200) {
                $("#book_" + e.target.id).attr('style', 'display:none!important');
                console.log(this.props.AllBooks.filter(item => item.id === parseInt(e.target.id)))
                this.setState({totalPrice: this.state.totalPrice - this.props.AllBooks.filter(item => item.id === parseInt(e.target.id))[0].price - this.shipmentCost});
                // location.reload()
                $('#bucket_ind').html(parseInt($('#bucket_ind').text()) - 1);
                await this.props.login(this.props.token);
                await this.props.getBooksByIDS(this.props.user_info.bucket);

            } else {
            }
        };
        this.makeDelivery = async (user_id) => {
            if (!this.props.user_info.bucket.length) {
                $('#toast-body').css("color", "black").html("The bucket is empty");
                $('#toast-title').html("Caution");
                $('.toast').css("background-color", "yellow").toast('show');
                return;
            }
            if (this.props.user_info.address === "") {
                $('#toast-body').css("color", "black").html("Please fill 'address' field in the profile settings in order to make a delivery.");
                $('#toast-title').html("Caution");
                $('.toast').css("background-color", "yellow").toast('show');
                return;
            }

            for (let book of this.props.AllBooks) {
                let formData = new FormData()
                formData.append('status', "Pending");
                formData.append('cost', (Math.round((book.price + this.shipmentCost) * 100) / 100).toString());
                formData.append('book_id', book.id);
                formData.append('user_id', user_id);
                let response = await fetch('/api/delivery/0/',
                    {
                        method: 'POST',
                        body: formData
                    })

            }
            await fetch('/auth/users/me/',
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'token ' + this.props.token
                    },
                    body: JSON.stringify({

                        'bucket': []
                    })
                })
            $('#toast-body').css("color", "white").html("Orders were successfully made");
            $('#toast-title').html("Success");
            $('.toast').css("background-color", "green").toast('show');
            await setTimeout(() => {
                location.href = '/profile#orders';
            }, 1500);

        };
    }

    render() {
        return (
            <Fragment>
                <Header/>
                <Toasts/>
                <div className='main container'>


                    {this.state.loaded ?
                        <div className="contacts_div">
                            <h1 id="category-title">Bucket Items</h1>
                            {this.props.AllBooks.map((book) => (

                                <div key={book.id} id={"book_" + book.id} className="d-flex justify-content-center row">
                                    <div className="col-md-10">
                                        <div className="row p-2 rounded" style={{backgroundColor: '#282d404f'}}>

                                            <div className="col-md-3 mt-1"><img
                                                className="img-fluid img-responsive rounded product-image"
                                                src={book.imgSrc}/></div>

                                            <div className="col-md-6 mt-1">
                                                <a href={"/books/" + book.id}>
                                                    <h5>{book.name}</h5>
                                                </a>
                                                <div className="d-flex flex-row">
                                                    <span><span style={{
                                                        fontSize: "x-large",
                                                        color: '#a78e17c9'
                                                    }}>{book.rating}</span>/5</span>
                                                </div>
                                                <div style={{overflow: 'hidden', maxHeight: '100px'}}
                                                     className="text-justify para mb-0">{book.description}</div>
                                            </div>

                                            <div
                                                className="align-items-center align-content-center col-md-3 border-left mt-1">
                                                <div className="d-flex flex-row align-items-center">
                                                    <h4 className="mr-1">${book.price}</h4>
                                                </div>
                                                <h6 className="text-success">Shipment: ${this.shipmentCost}</h6>
                                                <div className="d-flex flex-column mt-4">
                                                    <button className="btn btn-outline-primary btn-sm mt-2"
                                                            type="button" id={book.id} onClick={this.remove}>
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ))}
                            <div style={{float: "right"}}>
                                <h3 id="category-title">TOTAL: ${Math.round(this.state.totalPrice * 100) / 100}</h3>
                                <button className="btn btn-outline-primary btn-sm mt-2"
                                        type="button" onClick={() => {
                                    this.makeDelivery(this.props.user_info.id)
                                }}>
                                    Order All
                                </button>
                            </div>
                            <span style={{clear: "both", display: "table"}}></span>
                        </div>
                        :
                        <Fragment></Fragment>
                    }
                </div>

                <Footer/>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        AllBooks: state.books.AllBooks,
        token: state.auth.token,
        user_info: state.auth.user_info
    }
};

export default connect(mapStateToProps, {getBooksByIDS, login})(Bucket);
