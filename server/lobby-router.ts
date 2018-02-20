import * as express from 'express';
import { lobbyManager } from './server';
export const LobbyRouter = express.Router();

LobbyRouter.route("/")
    .get((req, res) => {
        res.send(lobbyManager.getLobbies());
    })
    .post((req, res) => {
        res.sendStatus(405);
    })


LobbyRouter.route("/:id")
    .all((req, res, next) => {
        console.log(req.params.id);
        next();
    })
    .get((req, res) => {
        let lobby = lobbyManager.getLobby(req.params.id);
        if (lobby) res.status(200).send(lobby);
        else res.sendStatus(404);
    })
    .post((req, res) => {
        res.sendStatus(405);
    })
    .put((req, res) => {
        res.sendStatus(405);
    })
    .delete((req, res) => {
        lobbyManager.deleteLobby(req.params.id);
        res.sendStatus(204);
    })

