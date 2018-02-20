import * as express from 'express';
import GameManager from 'game-manager';
import { gameManager } from 'server';
export const GamesRouter = express.Router();

GamesRouter.route("/")
    .get((req, res) => {
        let games = [];
        for (let game of gameManager.games.values()) {
            games.push({
                id: game.id
            })
        }
        res.send(games);
    })
    .post((req, res) => {
        res.sendStatus(405);
    })


GamesRouter.route("/:id")
    .get((req, res) => {
        console.log(req.params.id);
        res.sendStatus(405);
    })
    .post((req, res) => {
        res.sendStatus(405);
    })
    .put((req, res) => {
        res.sendStatus(405);
    })
    .delete((req, res) => {
        res.sendStatus(405);
    })

