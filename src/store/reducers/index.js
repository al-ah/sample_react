import {combineReducers} from 'redux'
import {articleReducer} from './article'
import {authReducer} from './auth'

const reducer = combineReducers({
    article:articleReducer,
    ath:authReducer
})

export default reducer;