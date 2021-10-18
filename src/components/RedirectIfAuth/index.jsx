import {Route, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'

export default function RedirectIfAuth({path, props, component: Component}) {
    const user = localStorage.getItem('user')
    let isAuthenticated = false;

    if (user) {
        try{
            const token = JSON.parse(user).auth_token;

            if (token) {
                isAuthenticated = true
            }
        }
        catch (error){

        }
    }

    return (
        <Route
            path={path}
            render={(routerProps) => {
                if (!isAuthenticated) {
                    return (<Component {...props} {...routerProps}></Component>)
                }

                return <Redirect to='/'></Redirect>
            }}
        >

        </Route>
    )

}

RedirectIfAuth.propTypes = {
    path: PropTypes.string.isRequired,
    props: PropTypes.object.isRequired,
    component: PropTypes.func.isRequired
}