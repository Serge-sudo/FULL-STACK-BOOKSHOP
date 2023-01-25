import React, {Component, Fragment} from 'react';
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Toasts from "../shop/Toasts";

class Register extends Component {
    constructor(props) {
        super(props);
        this.Reg = async (e) => {
            e.preventDefault();
            const formData = new FormData()
            formData.append('email', e.target.email.value);
            formData.append('date_of_birth', e.target.date_of_birth.value);
            formData.append('name', e.target.name.value);
            formData.append('last_name', e.target.last_name.value);
            formData.append('username', e.target.username.value);
            formData.append('password', e.target.password.value);
            formData.append('re_password', e.target.re_password.value);
            let response = await fetch('/auth/users/',
                {
                    method: 'POST',
                    body: formData
                })
            let data = await response.json();
            if (response.status === 201) {
                $('#toast-body').css("color", "white").html("Account was successfully created!");
                $('#toast-title').html("Success");
                $('.toast').css("background-color", "green").toast('show');
                await setTimeout(() => {
                    location.href = '/login';
                }, 1500);
            } else {
                document.getElementById("err").innerHTML = data[Object.keys(data)[0]][0];
            }
        }
    }

    render() {
        return (
            <div>
                <Toasts/>

                {/*Stylesheet*/}
                <style media="screen"
                       dangerouslySetInnerHTML={{__html: "\n      *,\n*:before,\n*:after{\n    padding: 0;\n    margin: 0;\n    box-sizing: border-box;\n} .column{ min-width: 300px; display: table-cell; padding: 10px;}  .cell{ display: table-row;}\nbody{\n    background-color: #080710;\n} \n.background{\n    width: 430px;\n    height: 520px;\n    position: absolute;\n    transform: translate(-50%,-50%);\n    left: 50%;\n    top: 50%;\n}\n.background .shape{\n    height: 200px;\n    width: 200px;\n    position: absolute;\n    border-radius: 50%;\n}\n.shape:first-child{\n    background: linear-gradient(\n        #1845ad,\n        #23a2f6\n    );\n    left: -80px;\n    top: -80px;\n}\n.shape:last-child{\n    background: linear-gradient(\n        to right,\n        #ff512f,\n        #f09819\n    );\n    right: -30px;\n    bottom: -80px;\n}\nform{\n    display:table;\n    background-color: rgba(255,255,255,0.13);\n    position: absolute;\n    transform: translate(-50%,-50%);\n    top: 50%;\n    left: 50%;\n    border-radius: 10px;\n    backdrop-filter: blur(10px);\n    border: 2px solid rgba(255,255,255,0.1);\n    box-shadow: 0 0 40px rgba(8,7,16,0.6);\n    padding:20px 35px;\n}\nform *{\n    font-family: 'Poppins',sans-serif;\n    color: #ffffff;\n    letter-spacing: 0.5px;\n    outline: none;\n    border: none;\n}\nform h3{\n    font-size: 32px;\n    font-weight: 500;\n    line-height: 42px;\n    text-align: center;\n}\n\nlabel{\n    display: block;\n    margin-top: 30px;\n    font-size: 16px;\n    font-weight: 500;\n}\ninput{\n    display: block;\n    height: 50px;\n    width: 100%;\n    background-color: rgba(255,255,255,0.07);\n    border-radius: 3px;\n    padding: 0 10px;\n    margin-top: 8px;\n    font-size: 14px;\n    font-weight: 300;\n}\n::placeholder{\n    color: #e5e5e5;\n}\nbutton{\n    margin-top: 50px;\n    width: 48%;\n margin:3px;\n    background-color: #ffffff;\n    color: #080710;\n    padding: 15px 0;\n    font-size: 18px;\n    font-weight: 600;\n    border-radius: 5px;\n    cursor: pointer;\n}\n.social{\n  margin-top: 30px;\n  display: flex;\n}\n.social div{\n  background: red;\n  width: 150px;\n  border-radius: 3px;\n  padding: 5px 10px 10px 5px;\n  background-color: rgba(255,255,255,0.27);\n  color: #eaf0fb;\n  text-align: center;\n}\n.social div:hover{\n  background-color: rgba(255,255,255,0.47);\n}\n.social .fb{\n  margin-left: 25px;\n}\n.social i{\n  margin-right: 4px;\n}\n\n    "}}/>
                <div className="background">
                    <div className="shape"/>
                    <div className="shape"/>
                </div>
                <form onSubmit={this.Reg}>
                    <h3 style={{display: 'table-caption'}}>Register</h3>

                    <div className="column">
                        <label>Email:<input type="email" name="email"/></label>

                        <label>Username:<input type="text" name="username"/></label>

                        <label>Password:<input type="password" name="password"/></label>

                        <label>Confirm Password:<input type="password" name="re_password"/></label>
                        <div>
                            <button type="submit" style={{width: '100%', marginTop: '15px'}}>Sign Up</button>
                        </div>
                    </div>

                    <div className="column">
                        <label>Name:<input type="text" name="name"/></label>

                        <label>Lastname:<input type="text" name="last_name"/></label>

                        <label>Birthday:<input type="date" name="date_of_birth"/></label>
                        <p id="err" style={{
                            color: "red",
                            display: "flex",
                            height: "110px",
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}></p>
                        <div>

                            <button style={{width: '100%'}} type="button" onClick={() => {
                                location.href = '/login'
                            }}>Log In
                            </button>


                        </div>
                    </div>


                </form>

            </div>


        );
    }
}

export default Register;