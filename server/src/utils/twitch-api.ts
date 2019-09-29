const TWITCH_HOST = 'https://api.twitch.tv/helix/';

const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID
if (!TWITCH_CLIENT_ID)
    throw new Error('Missing proccess.env.TWITCH_CLIENT_ID');


import axios from 'axios';
import { URL } from 'url';

export class TwitchSDK {
    constructor(private clientId: string) {

    }

    public getClips(params: getClipsByBroadcasterParameters) {
        const url = new URL('clips', TWITCH_HOST);
        expandQueryParams(url, params);
        console.log(url);
        return axios.get(url.toString(), {
            headers: {
                "Client-ID": this.clientId,
                "Cache-Control": "no-cache"
            }
        });
    }

    public getGameId(name: string) {
        const url = new URL('games', TWITCH_HOST);
        expandQueryParams(url, { name });
        console.log(url);
        return axios.get(url.toString(), {
            headers: {
                "Client-ID": this.clientId
            }
        });
    }
}

export interface getClipsByBroadcasterParameters {
    broadcaster_id?: string,
    game_id?: string,
    id?: string,
    after?: string,
    before?: string,
    first?: string,
    ended_at?: string,
    started_at?: string
}

function expandQueryParams(url: URL, query: any) {
    Object.keys(query).forEach(param => {
        url.searchParams.append(param, (<any>query)[param])
    })
    // url.searchParams.append('no-cache', Math.random() + '')
}

export const SDK = new TwitchSDK(TWITCH_CLIENT_ID);
