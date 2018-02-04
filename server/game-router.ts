import * as express from 'express';
import GameManager from './game-manager';
import { gameManager } from './server';
export const GamesRouter = express.Router();

GamesRouter.get('/games', (req, res) => {
    let games = [];
    for(let game of gameManager.games.values()){
        games.push({
            id: game.id
        })
    }
    res.send(games);
})