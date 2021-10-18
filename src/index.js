import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, withRouter} from 'react-router-dom'
import AuthService from "./services/auth";
import App from "./components/App";
import ArticleService from "./services/article";
import FileService from "./services/file";
import NotificationService from "./services/notification";
import './app.css'
import {Provider} from 'react-redux'
import store from "./store";


const Main = withRouter((props) => {
    return (
        <App
            {...props}
            authService={new AuthService()}
            notyService={new NotificationService()}
        />
    )
});


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Main></Main>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);