import dotenv from 'dotenv';

import app from './app';
import config from './services/config';

const port = config.port;

dotenv.config();

app.listen(port, () => console.log(`Listening on port ${port}`));
