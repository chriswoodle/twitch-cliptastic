import * as express from 'express';

import { SDK } from '../utils/twitch-api';
export const router = express.Router();
router.get('/:broadcaster_id', (req, res) => {
    const broadcaster_id = req.params.broadcaster_id;
    const game_id = req.query.game_id;
    console.log(broadcaster_id);
    const query: any = { broadcaster_id };
    console.log(query);
    let game = "";

    return Promise.resolve().then(() => {
        return SDK.getGameId(game_id)
    }).then(response => {
        console.log(response.data.data);
        game = response.data.data[0].id;

        return SDK.getClips(query);
    }).then(response => {
        console.log(response.status, response.data.data, game_id);
        const clips = response.data.data.filter((clip: any) => {
            return clip.game_id === game;
        });
        res.send({ items: clips })
    }).catch(error => {
        console.log(error)
        res.status(500);
        res.send({ error })
    })



})