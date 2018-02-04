import * as React from "react";
import GamesList from "components/games-list";

export default class Home extends React.Component{
    render(){
        return (
            <div className="container">
                <h1 className="display-1">
                    Welcome!
                </h1>
                <h2>Open Games</h2>
                <GamesList/>
            </div>
        );
    }
}