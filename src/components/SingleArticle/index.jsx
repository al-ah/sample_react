import React from "react";
import SingleArticleContainer from "./single-article-container";
import {connect} from "react-redux";
import {getArticle} from '../../store/actions/article'

class SingleArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article: null
        }
    }

    async componentDidMount() {

        const article_id = this.props.match.params.article_id;

        if (article_id) {
            let article = this.props.articles.results.find(a => a.id == article_id)
            if (article) {
                this.setState({article: article})
            } else {
                setTimeout(async () => {
                    const token = await this.props.getToken();
                    await this.props.getArticle(token, article_id)
                }, 100)
            }
        }
    }


    render() {
        return (
            <div>
                {
                    this.state.article &&
                    <SingleArticleContainer article={this.state.article}></SingleArticleContainer>
                }
                {
                    this.props.article &&
                    <SingleArticleContainer article={this.props.article}></SingleArticleContainer>
                }
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        article: state.article.article,
        loading: state.article.loading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getArticle: (token, id) => dispatch(getArticle(token, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleArticle)