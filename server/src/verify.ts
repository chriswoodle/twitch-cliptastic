import debug from 'debug';
const log = debug('clip:verify');

const BEARER_PREFIX = 'Bearer ';

import * as jsonwebtoken from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const sec = ` ${process.env.TWITCH_EBS_SECRET}`;
const secret = Buffer.from(sec, 'base64');

export function verifyJWT(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
        log('Missing authorization header!')
        return res.sendStatus(401);
    }
    const payload = verifyAndDecode(req.headers.authorization);
    if (!payload) {
        log('JWT failed to verify!');
        return res.sendStatus(401);
    }
    const { channelId, opaqueUserId } = payload as any;
    req.channel_id = channelId;
    req.opaque_user_id = opaqueUserId;

    next();
}

// Verify the header and the enclosed JWT.
function verifyAndDecode(header: string) {
    if (!header.startsWith(BEARER_PREFIX))
        return;
    try {
        const token = header.substring(BEARER_PREFIX.length);
        return jsonwebtoken.verify(token, secret, { algorithms: ['HS256'] });
    }
    catch (ex) {
        log(ex);
        return;
    }
}
