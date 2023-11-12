import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const port = process.env.PORT;

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

export default app;