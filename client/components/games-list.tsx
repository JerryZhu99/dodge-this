import * as React from "react";

export default class GamesList extends React.Component {
    state: { games: any[] }
    constructor(props: any) {
        super(props);
        this.state = { games: [] };
        let req = new XMLHttpRequest();
        req.open("GET", "/api/games");
        let that = this;
        req.addEventListener("load", function (event) {
            that.setState({
                games: JSON.parse(this.responseText).map((e: any) => (
                    <li className="list-group-item" key={e.id}>
                        ID: {e.id}
                    </li>
                ))
            });
        });
        req.send();
    }
    render() {
        const games = this.state.games;
        return (
            <ul className="list-group">
                {games}
            </ul>
        );
    }
}