import { Navigate } from 'react-router-dom';
import React from "react";
import {connect} from "react-redux";

const PrivateRoutes = (props) => {
    return props.token ? props.Component : <Navigate to="/" />
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};
export default connect(mapStateToProps)(PrivateRoutes);
