import {validateAll} from "indicative/validator";
import Axios from "axios";

export default class AuthService {
    async registerUser(data) {

        const rules = {
            username: 'required|alpha_numeric',
            email: 'required|email',
            password: 'required|min:4|confirmed',
        }
        const messages = {
            required: (field) => `${field} is required`,
            'username.alphanumeric': 'Name contains unallowed characters',
            'email.email': 'Please enter a valid email address',
            'password.min': 'Password is too short',
            'password.confirmed': 'Password confirmation did not matched.',
        }

        try {
            await validateAll(data, rules, messages)
        } catch (error) {
            const errors = {};
            error.map(err => {
                errors[err.field] = err.message
            });

            await Promise.reject(errors);
        }
        try {
            const resp = await Axios.post(
                `${process.env.REACT_APP_REST_API_URL}/api/users/`,
                {
                    username: data.username,
                    password: data.password,
                    email: data.email
                },
                {
                    headers: {Authorization: `Token ${process.env.REACT_APP_REST_API_ADMIN_TOKEN}`}
                }
            )
            const token_res = await Axios.post(
                `${process.env.REACT_APP_REST_API_URL}/auth/`,
                {
                    username: data.username,
                    password: data.password
                }
            )
            let token = token_res.data.token;
            const user = resp.data;
            user['auth_token'] = token;
            return user;

        } catch (error) {
            if (error.response.data) {
                await Promise.reject(error.response.data);
            }
        }

    }

    async loginUser(data) {

        const rules = {
            username: 'required',
            password: 'required|min:4',
        }
        const messages = {
            required: (field) => `${field} is required`,
            'password.min': 'Password is too short',
        }

        try {
            await validateAll(data, rules, messages)
        } catch (error) {
            const errors = {};
            error.map(err => {
                errors[err.field] = err.message
            });

            await Promise.reject(errors);
        }
        try {
            const resp = await Axios.post(`${process.env.REACT_APP_REST_API_URL}/api/users/get_token/`,
                {
                    password: data.password,
                    username: data.username,
                    email: data.username
                },
                {
                    headers: {Authorization: `Token ${process.env.REACT_APP_REST_API_ADMIN_TOKEN}`}
                })
            return resp.data;
            ;

        } catch (error) {
            if (error.response.data) {
                await Promise.reject(error.response.data);
            }
        }


    }
}