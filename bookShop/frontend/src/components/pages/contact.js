import React, {Component, Fragment} from 'react';
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Toasts from "../shop/Toasts";

class Contact extends Component {
    constructor(props) {
        super(props);
        this.infoSend = (e) => {
            e.preventDefault();
            e.target.reset();
            $('#toast-body').css("color", "white").html("Information was successfully sent");
            $('#toast-title').html("Success");
            $('.toast').css("background-color", "green").toast('show');
        }
    }

    render() {
        return (
            <Fragment>
                <Header/>
                <Toasts/>
                <div className='main container'>

                    <div className={'contacts_div'}>
                        <h1 id="category-title">Contacts</h1>
                        <section className="mb-4">

                            <p className="text-center w-responsive mx-auto mb-5">Do you have any questions? Please do
                                not hesitate to contact us directly. Our team will come back to you within
                                a matter of hours to help you.</p>
                            <div className="row">
                                {/*Grid column*/}
                                <div className="col-md-9 mb-md-0 mb-5">
                                    <form id="contact-form" onSubmit={this.infoSend}>
                                        {/*Grid row*/}
                                        <div className="row">
                                            {/*Grid column*/}
                                            <div className="col-md-6">
                                                <div className="md-form mb-0">
                                                    <input type="text" id="name" placeholder={"Your name"} name="name"
                                                           className="form-control"/>
                                                    <label htmlFor="message"></label>
                                                </div>
                                            </div>
                                            {/*Grid column*/}
                                            {/*Grid column*/}
                                            <div className="col-md-6">
                                                <div className="md-form mb-0">
                                                    <input type="text" id="email" placeholder={"Your email"}
                                                           name="email"
                                                           className="form-control"/>
                                                    <label htmlFor="message"></label>
                                                </div>
                                            </div>
                                            {/*Grid column*/}
                                        </div>
                                        {/*Grid row*/}
                                        {/*Grid row*/}
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="md-form mb-0">
                                                    <input type="text" id="subject" placeholder={"Subject"}
                                                           name="subject"
                                                           className="form-control"/>
                                                    <label htmlFor="message"></label>
                                                </div>
                                            </div>
                                        </div>
                                        {/*Grid row*/}
                                        {/*Grid row*/}
                                        <div className="row">
                                            {/*Grid column*/}
                                            <div className="col-md-12">
                                                <div className="md-form">
                                                    <textarea type="text" id="message" placeholder={"Your message"}
                                                              name="message" rows={2}
                                                              className="form-control md-textarea" defaultValue={""}/>
                                                    <label htmlFor="message"></label>
                                                </div>
                                            </div>
                                        </div>
                                        {/*Grid row*/}
                                        <div className="text-center text-md-left">
                                            <button className="btn btn-primary" type="submit">Send</button>
                                        </div>
                                    </form>

                                    <div className="status"/>
                                </div>
                                {/*Grid column*/}
                                {/*Grid column*/}
                                <div className="col-md-3 text-center">
                                    <ul className="list-unstyled mb-0">
                                        <li><i className="fas fa-map-marker-alt fa-2x"/>
                                            <p>San Francisco, CA 94126, USA</p>
                                        </li>
                                        <li><i className="fas fa-phone mt-4 fa-2x"/>
                                            <p>+ 1 234 567 89</p>
                                        </li>
                                        <li><i className="fas fa-envelope mt-4 fa-2x"/>
                                            <p>info@bookShop.com</p>
                                        </li>
                                    </ul>
                                </div>
                                {/*Grid column*/}
                            </div>
                        </section>
                        {/*Section: Contact v.2*/}

                    </div>

                </div>
                <Footer/>
            </Fragment>
        );
    }
}

export default Contact;