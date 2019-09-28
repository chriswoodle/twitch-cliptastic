import debug from 'debug';
debug.enable('clip:*');
const log = debug('clip:server');

import * as express from 'express';

// Express middleware
import * as cors from 'cors';
import * as morgan from 'morgan';

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.static('../extension/dist'));

app.get('/', (req, res) => res.send('Hello World!'))


app.listen(PORT, () => {
    log(`Example app listening on port ${PORT}!`);
});