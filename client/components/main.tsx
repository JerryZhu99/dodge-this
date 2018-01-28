import * as React from "react";
import { NavLink, HashRouter, Route } from "react-router-dom";

import Navbar from "./navbar";
import GameContainer from "./game-container";
import Home from "./home";

export default class Main extends React.Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <Navbar />
                    <div className="content">
                        <Route exact path="/" component={Home}></Route>
                        <Route path="/play" component={GameContainer}></Route>
                    </div>
                </div>
            </HashRouter>
        )
    }
}