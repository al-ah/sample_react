import {LOGIN_USER, LOGIN_USER_LOADING, LOGIN_USER_LOADED} from '../actions/auth'

let userInfo = {}
try {
    const user = localStorage.getItem('user')
    userInfo = JSON.parse(userInfo)

} catch (e) {

}

export function authReducer(state = userInfo, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                user: action.payload
            }
        case LOGIN_USER_LOADING:
            return {
                ...state,
                loading: true
            }
        case LOGIN_USER_LOADED:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}