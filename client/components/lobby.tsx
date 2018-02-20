import * as React from "react";
import PlayerList from "./player-list";
import { NavLink } from "react-router-dom";

export default class Lobby extends React.Component {
    render() {
        return (
            <div className="container border-lr fill">
                <div className="row">
                    <div className="col mt-3">
                        <header>
                            <h1>Lobby</h1>
                            <hr />
                        </header>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <PlayerList />
                    </div>
                    <div className="col">
                        <PlayerList />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <NavLink to={"/game/"} className="btn btn-success">Start Game</NavLink>
                    </div>
                </div>
            </div>
        );
    }
}