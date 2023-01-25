import React, {Component, Fragment} from 'react';
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import {connect} from "react-redux";
import Toasts from "../shop/Toasts";


class Settings extends Component {
    constructor(props) {
        super(props);
        this.Upd = async (e) => {
            e.preventDefault();
            const formData = new FormData()
            formData.append('email', e.target.email.value);
            formData.append('date_of_birth', e.target.date_of_birth.value);
            formData.append('name', e.target.name.value);
            formData.append('last_name', e.target.last_name.value);
            formData.append('address', e.target.address.value);
            if (e.target.image.files[0])
                formData.append('img', e.target.image.files[0]);
            let response = await fetch('/auth/users/me/',
                {
                    method: 'PATCH',
                    headers: {
                        'Authorization': 'token ' + this.props.token,

                    },
                    body: formData
                })
            let data = await response.json();
            if (response.status === 200) {
                $('#toast-body').css("color", "white").html("Data was successfully changed");
                $('#toast-title').html("Success");
                $('.toast').css("background-color", "green").toast('show');
            } else {
                let output = "";
                for (let a in data) {
                    output += data[a][0] + "<br>";
                }
                $('#toast-body').css("color", "white").html(output);
                $('#toast-title').html("Error");
                $('.toast').css("background-color", "red").toast('show');

            }
            document.getElementById('PasswordForm').reset();
        }
        this.SetDefaultImage = async () => {
            document.getElementById("profile_picture").src = "/media/images/user_images/default_user_image.png";
            let blob = await fetch('/media/images/user_images/default_user_image.png').then(r => r.blob());
            let file = new File([blob], "default.png", {type: "image/png"});
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            document.getElementById('image').files = dataTransfer.files;
        }
        this.changePicture = () => {
            let reader = new FileReader();
            reader.onloadend = (e) => {
                document.getElementById("profile_picture").src = e.target.result
            }
            reader.readAsDataURL(document.getElementById('image').files[0]);
        }
        this.changePassword = async (e) => {
            e.preventDefault();
            const formData = new FormData()
            formData.append('new_password', e.target.newPass.value);
            formData.append('re_new_password', e.target.newPassConfirm.value);
            formData.append('current_password', e.target.currentPass.value);
            let response = await fetch('/auth/users/set_password/',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': 'token ' + this.props.token,

                    },
                    body: formData
                })
            if (response.status === 204) {
                $('#toast-body').css("color", "white").html("Password was successfully changed");
                $('#toast-title').html("Success");
                $('.toast').css("background-color", "green").toast('show');;
            } else {
                let data = await response.json();
                let output = "";
                for (let a in data) {
                    output += data[a][0] + "<br>";
                }
                $('#toast-body').css("color", "white").html(output);
                $('#toast-title').html("Error");
                $('.toast').css("background-color", "red").toast('show');
            }
            document.getElementById('UserInfoForm').reset();
        }
    }

    render() {
        return (
            <Fragment>
                <Header/>
                <Toasts/>
                <div className='main container'>
                    <div id="settings">
                        <div className="row">
                            <div className="col-12">
                                {/* Page title */}
                                <div className="my-5">
                                     <h1 id="category-title">Settings</h1>
                                    <hr/>
                                </div>
                                {/* Form START */}
                                <form onSubmit={this.Upd} className="file-upload" id="UserInfoForm">
                                    <div className="row mb-5 gx-5">
                                        {/* Contact detail */}
                                        <div className="col-xxl-8 mb-5 mb-xxl-0">
                                            <div className="bg-secondary-soft px-4 py-5 rounded">
                                                <div className="row g-3">
                                                    <h4 className="mb-4 mt-0">Contact detail</h4>

                                                    <div className="col-md-6">
                                                        <label className="form-label">First Name *</label>
                                                        <input type="text" name="name" className="form-control"
                                                               placeholder
                                                               aria-label="First name"
                                                               defaultValue={this.props.user_info.name}/>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label className="form-label">Last Name *</label>
                                                        <input type="text" name="last_name" className="form-control"
                                                               placeholder
                                                               aria-label="Last name"
                                                               defaultValue={this.props.user_info.last_name}/>
                                                    </div>


                                                    <div className="col-md-6">
                                                        <label htmlFor="inputEmail4" className="form-label">Email
                                                            *</label>
                                                        <input type="email" name="email" className="form-control"
                                                               id="email"
                                                               defaultValue={this.props.user_info.email}/>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label htmlFor="inputEmail4" className="form-label">Date of
                                                            Birth
                                                            *</label>
                                                        <input type="date" name="date_of_birth" className="form-control"
                                                               id="inputBirth"
                                                               defaultValue={this.props.user_info.date_of_birth}/>
                                                    </div>
                                                           <div className="col-md-6">
                                                        <label htmlFor="inputEmail4" className="form-label">Address
                                                            </label>
                                                        <input type="text" name="address" className="form-control"
                                                               id="inputAddress"
                                                               defaultValue={this.props.user_info.address}/>
                                                    </div>

                                                </div>
                                                {/* Row END */}
                                            </div>
                                        </div>
                                        {/* Upload profile */}
                                        <div className="col-xxl-4">
                                            <div className="bg-secondary-soft px-4 py-5 rounded">
                                                <div className="row g-3">
                                                    <h4 className="mb-4 mt-0">Upload your profile photo</h4>
                                                    <div className="text-center">
                                                        {/* Image upload */}
                                                        <div className="square position-relative display-2 mb-3">
                                                            <img style={{maxWidth: "200px"}}
                                                                 className="fas fa-user top-50 start-50  text-secondary"
                                                                 src={this.props.user_info.img} id="profile_picture"
                                                                 alt=""/>
                                                        </div>
                                                        {/* Button */}


                                                        <label className="btn btn-success-soft "
                                                        >Upload<input onInput={this.changePicture} id="image"
                                                                      type="file" name="image"
                                                                      hidden/></label>

                                                        <button type="button"
                                                                className="btn btn-danger-soft btn-block"
                                                                onClick={this.SetDefaultImage}>Set Default
                                                        </button>
                                                        {/* Content */}
                                                        <p className="text-muted mt-3 mb-0"><span
                                                            className="me-1">Note:</span>Minimum size 300px x 300px
                                                        </p>
                                                    </div>
                                                    <button type="submit" className="btn btn-primary btn-lg">Update
                                                        profile
                                                    </button>
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </form>
                                <form onSubmit={this.changePassword} id="PasswordForm">
                                    <div className="row mb-5 gx-5">

                                        <div className="col-xxl-6">
                                            <div className="bg-secondary-soft px-4 py-5 rounded">
                                                <div className="row g-3">
                                                    <h4 className="my-4">Change Password</h4>
                                                    {/* Old password */}
                                                    <div className="col-md-6">
                                                        <label htmlFor="exampleInputPassword1"
                                                               className="form-label">Old password *</label>
                                                        <input type="password" name="currentPass"
                                                               className="form-control"
                                                               id="exampleInputPassword1"/>
                                                    </div>
                                                    {/* New password */}
                                                    <div className="col-md-6">
                                                        <label htmlFor="exampleInputPassword2"
                                                               className="form-label">New password *</label>
                                                        <input type="password" name="newPass" className="form-control"
                                                               id="exampleInputPassword2"/>
                                                    </div>
                                                    {/* Confirm password */}
                                                    <div className="col-md-12">
                                                        <label htmlFor="exampleInputPassword3"
                                                               className="form-label">Confirm Password *</label>
                                                        <input type="password" name="newPassConfirm"
                                                               className="form-control"
                                                               id="exampleInputPassword3"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="gap-3 d-md-flex justify-content-md-center text-center">
                                        <button type="submit" className="btn btn-primary btn-lg">Update Password
                                        </button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>

                </div>
                <Footer/>
            </Fragment>


        )
    }
}

const mapStateToProps = (state) => {
    return {
        user_info: state.auth.user_info,
        token: state.auth.token
    }
};

export default connect(mapStateToProps)(Settings);

