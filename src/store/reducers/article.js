import {GET_ARTICLE,GET_ARTICLE_LOADING,GET_ARTICLE_LOADED} from '../actions/article'

export const articleReducer = (state={article:null},action) => {
    switch (action.type) {
        case GET_ARTICLE:
            return {
                ...state,
                article:action.payload
            }
        case GET_ARTICLE_LOADING:
            return {
                ...state,
                loading:true
            }
        case GET_ARTICLE_LOADED:
            return {
                ...state,
                loading:false
            }
        default:
            return state
    }
}