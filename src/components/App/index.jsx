import React from "react";
import Navbar from "../Navbar";
import {Route} from "react-router-dom";
import Welcome from "../Welcome";
import Login from "../Login";
import CreateArticle from "../CreateArticle";
import SingleArticle from "../SingleArticle";
import Signup from "../Signup";
import Footer from "../Footer";
import PropTypes from 'prop-types';
import Auth from "../Auth";
import RedirectIfAuth from "../RedirectIfAuth";
import UserArticles from "../user-article";

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.min.css';
import ArticlePage from "../../ui-components/page-builder";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: null,
            articles: {
                results: []
            },
        }
    }

    setArticles = (articles) => {
        this.setState({
            articles
        })
    }

   async componentWillMount()  {
        try {
            const userInfo = await localStorage.getItem('user')
            this.setState({userInfo: JSON.parse(userInfo)});
        } catch (e) {

        }
    }

    setUserInfo = (user, redirect_to = '/') => {
        localStorage.setItem('user', JSON.stringify(user))
        this.setState({
            userInfo: user,
        })
        window.location.href = redirect_to || '/'
    }

    getToken = async () => {
        try {
            return this.state.userInfo.auth_token
        } catch (err) {
            return null
        }
    }

    registerUser = async (data) => {
        try {
            const resp = await this.props.authService.registerUser(data)
            this.props.notyService.success('', 'register was successful')
            return resp
        } catch (err) {
            this.props.notyService.danger('', `can not register user.${err.message ? err.message : ''}`)
        }
    }

    logoutUser = () => {
        localStorage.removeItem('user')
        this.setState({userInfo: null})
    }

    render() {
        const {location} = this.props;
        return (<div>

            <ReactNotification></ReactNotification>
            {!location.pathname.startsWith("/login") && !location.pathname.startsWith("/register") &&
            <Navbar userInfo={this.state.userInfo} logoutUser={this.logoutUser}>
            </Navbar>
            }
            <Route exact path="/page"
                   render={(props) => (
                       <ArticlePage
                           {...props}
                       > </ArticlePage>
                   )}>
            </Route>

            <Route exact path="/"
                   render={(props) => (
                       <Welcome
                           {...props}
                           setArticles={this.setArticles}
                       > </Welcome>
                   )}>
            </Route>


            <RedirectIfAuth path='/register/' component={Signup}
                            props={{
                                registerUser: this.registerUser,
                                setUserInfo: this.setUserInfo
                            }}>
            </RedirectIfAuth>

            <RedirectIfAuth path='/login/' component={Login}
                            props={{
                                setUserInfo: this.setUserInfo
                            }}>
            </RedirectIfAuth>

            <Auth exact path="/articles/create-article/" component={CreateArticle}
                  props={{
                  }}>
            </Auth>

            <Auth path="/articles/modify-article/:article_id" component={CreateArticle}
                  props={{
                  }}>
            </Auth>


            <Auth path="/user/articles/" component={UserArticles}
                  props={{
                      setArticles: this.setArticles,
                  }}>
            </Auth>

            <Route path="/article/:article_id"
                   render={props => (
                       <SingleArticle
                           {...props}
                           getToken={this.getToken}
                           articles={this.state.articles}>
                       </SingleArticle>)}>
            </Route>

            <button onClick={() => {
                this.props.notyService.success('', 'show service toast');
            }

            }>show service toast
            </button>
            {
                !location.pathname.startsWith("/login") && !location.pathname.startsWith("/register") &&
                <Footer></Footer>
            }
        </div>)
    }
}

App.propTypes =
    {
        location: PropTypes.shape({
            pathname: PropTypes.string.isRequired
        }).isRequired,

        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired,

        authService: PropTypes.object.isRequired,
        notyService: PropTypes.object.isRequired
    }
export default App;