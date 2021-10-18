import React from 'react';
import PageBuilder from "../../../ui-components/page-builder";
import PropTypes from "prop-types";
import LoginForm from "../../Login/login-form";

function SingleArticleContainer({article}){
    return (<div>
      </div>
      )
}

LoginForm.propTypes ={
    article:PropTypes.object.isRequired,
}

export default SingleArticleContainer;