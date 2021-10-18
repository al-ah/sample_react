import ArticleService from '../../services/article'

export const GET_ARTICLE = 'GET_ARTICLE'
export const GET_ARTICLE_LOADING = 'GET_ARTICLE_LOADING'
export const GET_ARTICLE_LOADED = 'GET_ARTICLE_LOADED'


export function getArticle(token, id) {
    return async function (dispatch, getState) {

        dispatch({
            type: GET_ARTICLE_LOADING
        })

        const articleService = new ArticleService();
        const resp = await articleService.getArticle(token, id)

        dispatch({
            type: GET_ARTICLE,
            payload: resp
        })

        dispatch({
            type: GET_ARTICLE_LOADED
        })

    }
}