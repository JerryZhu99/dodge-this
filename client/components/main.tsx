import * as React from "react";
import { NavLink, HashRouter, Route } from "react-router-dom";

import Navbar from "./navbar";
import GameContainer from "./game-container";
import Home from "./home";
import Play from "./play";
import Lobby from "./lobby";

export default class Main extends React.Component {
    render() {
        return (// TODO: Use BrowserRouter
            <HashRouter>
                <div>
                    <Navbar />
                    <div className="content">
                        <Route exact path="/" component={Home}></Route>
                        <Route path="/play" component={Play}></Route>
                        <Route path="/lobby/" component={Lobby}></Route>
                        <Route path="/game/" component={GameContainer}></Route>
                    </div>
                </div>
            </HashRouter>
        )
    }
}