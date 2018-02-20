import * as React from "react";
import GamesList from "components/games-list";
import { withRouter, Redirect } from "react-router-dom";

export default class Play extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = { lobbyId: 0 }
    }
    createGame = () => {
        this.setState({ lobbyId: 12 });
    }
    render() {
        if (this.state.lobbyId) {
            return <Redirect to={/lobby/ + this.state.lobbyId} />
        }
        return (
            <div className="container border-lr fill">
                <div className="row">
                    <div className="col mt-3">
                        <header>
                            <h1>Games</h1>
                            <hr />
                        </header>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <button className="btn btn-success" onClick={this.createGame}>Create Game</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <GamesList />
                    </div>
                </div>
            </div>
        );
    }
}