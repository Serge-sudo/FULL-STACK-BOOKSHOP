import React, {Component, Fragment} from 'react';
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import {useParams} from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../../actions/auth";
import {getBook} from "../../actions/books";

class BookPage extends Component {

    constructor(props) {
        super(props);
        this.id = this.props.params.id;
        this.state = {
            loaded: false
        }
        this.props.getBook(this.id).then(() => {
            this.setState({loaded: true})
        });
        this.addToBucket = async (e) => {
            e.preventDefault();
            await this.props.login(this.props.token); //Updating user information
            if (this.props.user_info.bucket.indexOf(this.id) !== -1) {
                return;
            }
            let response = await fetch('/auth/users/me/', {
                method: 'PATCH', headers: {
                    'Content-Type': 'application/json', 'Authorization': 'token ' + this.props.token
                }, body: JSON.stringify({
                    'bucket': this.props.user_info.bucket.concat(this.props.CurrentBooks.id)
                })
            })
            let data = await response.json();
            if (response.status === 200) {
                $("#add_bucket").attr('disabled', 'true');
                $('#bucket_ind').html(parseInt($('#bucket_ind').text()) + 1);
            } else {
            }

        }
    }


    render() {
        return (<Fragment>
            <Header/>
            <div className='main container'>
                {this.state.loaded ? <div className={'contacts_div'}>
                    <h1 id="category-title">{this.props.CurrentBooks.name}</h1>
                    <div className="bookInfoDiv">
                        <div>
                            <img src={this.props.CurrentBooks.imgSrc} alt=""/>
                        </div>
                        <div>
                                    <span>
                                        {[...Array(parseInt(this.props.CurrentBooks.rating)).keys()].map(() =>
                                            <i className="fa-solid fa-star" style={{color: 'gold'}}></i>
                                        )}
                                        <span style={{
                                            fontSize: "x-large", color: '#a78e17c9'
                                        }}> {this.props.CurrentBooks.rating}</span>/5</span>
                            <p>
                                {this.props.CurrentBooks.genre.map(genre => (
                                    <a href={'/category/' + genre}>{genre}  </a>))}
                            </p>

                            <h4 className="mr-1">CURRENT PRICE: <span
                                style={{color: 'green'}}>${this.props.CurrentBooks.price}</span></h4>
                            {this.props.user_info ? <form onSubmit={this.addToBucket}>
                                <button id={"add_bucket"}
                                        disabled={this.props.user_info.bucket.indexOf(parseInt(this.id)) !== -1}
                                        type="submit" className="btn">
                                    <i className="fa-solid fa-cart-shopping"></i> Add to bucket
                                </button>
                            </form> : <form action="/login">
                                <button
                                    type="submit" className="btn">
                                    <i className="fa-solid fa-cart-shopping"></i>
                                    Add to bucket
                                </button>
                            </form>}
                            <br/>
                            <p>{this.props.CurrentBooks.description}</p>

                        </div>
                    </div>

                </div> : <Fragment>

                </Fragment>

                }


            </div>
            <Footer/>
        </Fragment>);
    }
}

const mapStateToProps = (state) => {
    return {
        CurrentBooks: state.books.CurrentBooks, token: state.auth.token, user_info: state.auth.user_info
    }
};

export default connect(mapStateToProps, {getBook, login})((props) => (<BookPage
    {...props}
    params={useParams()}
/>));
