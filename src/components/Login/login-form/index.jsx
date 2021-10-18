import React from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
export default function  LoginForm ({handleSubmit,handleChange,errors}) {

    return (<div >
      

    </div>)
}

LoginForm.propTypes ={
    handleSubmit:PropTypes.func.isRequired,
    handleChange:PropTypes.func.isRequired,
    errors:PropTypes.objectOf(PropTypes.string)
}