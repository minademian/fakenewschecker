import RedisStore from 'connect-redis';
import { createClient } from 'redis';

export const SessionStore = async () => {
  const redisClient = createClient();
  redisClient.connect().catch(console.error);

  const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'myapp:',
  });

  return new Promise((resolve, reject) => {
    if (!redisStore) reject(null);
    resolve(redisStore);
  });
};
