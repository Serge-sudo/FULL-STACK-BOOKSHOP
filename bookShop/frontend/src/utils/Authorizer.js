import React, {Component} from 'react';
import {connect} from "react-redux";
import {InitUser} from "../actions/auth";

class Authorizer extends Component {

    constructor(props) {
        super(props);
        this.Init();
    }

    Init() {
        let token = localStorage.getItem('auth');
        if (!token) return;
        token = JSON.parse(token).auth_token;
        if (!token) return;
        this.props.InitUser(token).then((res) => {
            if(!res) localStorage.removeItem('auth');
        });
    }


    render() {
    }

}

export default connect(null, {InitUser})(Authorizer);

