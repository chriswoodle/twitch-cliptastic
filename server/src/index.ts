// Environment variable check
import './env';

// Debug
import debug from 'debug';
debug.enable('clip:*');
const log = debug('clip:server');

import * as express from 'express';

// Add JWT data to express reqeust object
// https://www.typescriptlang.org/docs/handbook/declaration-merging.html
declare global {
    namespace Express {
        export interface Request {
            channel_id?: string
            opaque_user_id?: string
        }
    }
}

// Express middleware
import * as cors from 'cors';
import * as morgan from 'morgan';

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// Server web front ends
app.use(express.static('../extension/dist'));

app.get('/', (req, res) => res.send('Hello World!'));

// All following calls must be made with the jwt token (from the browser)
import { verifyJWT } from './verify';
app.use(verifyJWT);
app.get('/testJWT', verifyJWT, (req, res) => {
    res.send('JWT is valid!')
});

// Register routes
import { router as clips } from './routes/clips';
app.use('/clips', clips)


app.listen(PORT, () => {
    log(`Example app listening on port ${PORT}!`);
});