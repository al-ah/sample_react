import React from 'react';
import LoginForm from "./login-form";
import {connect} from "react-redux";
import {loginUser} from '../../store/actions/auth'

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors:{}
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        this.setState({
            errors: {}
        })
        try {
            const user = await this.props.loginUser(this.state)
            this.props.setUserInfo(user,(this.props.location.state||{}).redirected_from)
        } catch (errors) {
            this.setState({errors})
        }
    }

    render() {
        return (
            <LoginForm
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                username={this.state.username}
                password={this.state.password}
                errors={this.state.errors}
            >

            </LoginForm>)
    }
}


const mapDispatchToProps = (dispatch) => {
    return({
        loginUser: (data) => dispatch(loginUser(data))
    })
}


export default connect(null,mapDispatchToProps)(Login);