import * as React from "react";

export default class NewsList extends React.Component<any, { news: any[] }> {
    constructor(props: any) {
        super(props);
        this.state = {news: [
            <NewsArticle title="Title" content="Content" date={new Date()}/>
        ]};
    }
    render() {
        const news = this.state.news;
        return (
            news
        );
    }
}

interface NewsArticleData {
    title: string;
    content: string;
    date: Date;
}

class NewsArticle extends React.Component<NewsArticleData, any>{
    render() {
        return (
            <article>
                <h2>{this.props.title}</h2><span>{this.props.date.toLocaleDateString()}</span>
                
                <p>{this.props.content}</p>
            </article>
        )
    }
}