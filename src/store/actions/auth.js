import AuthService from '../../services/auth'

export const LOGIN_USER = 'LOGIN_USER'
export const LOGIN_USER_LOADING = 'LOGIN_USER_LOADING'
export const LOGIN_USER_LOADED = 'LOGIN_USER_LOADED'

export const loginUser = (data) => async (dispatch, getState) => {
    dispatch({
        type: LOGIN_USER_LOADING
    })

    const authService = new AuthService()
    const resp = await authService.loginUser(data)

    dispatch({
        type: LOGIN_USER,
        payload: resp
    })

    dispatch({
        type: LOGIN_USER_LOADED
    })
    return resp


}


