import * as React from "react";
import NewsList from "components/news-list";

export default class Home extends React.Component {
    render() {
        return (
            <div className="container border-lr fill">
                <div className="row">
                    <div className="col mt-3">
                        <header>
                            <h1>News</h1>
                            <hr />
                        </header>
                        <NewsList />
                    </div>
                </div>
            </div>
        );
    }
}