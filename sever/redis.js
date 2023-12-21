import { createClient } from 'redis';

const client = createClient({
  host: '127.0.0.1',
  port: 6379
});

client.on('error', (err) => console.error('Redis Client Error', err));
client.on('connect', () => console.log('Redis Client Connected'));

async function setRedisValue() {
  try {
    await client.connect(); // Explicitly await connection
    await client.set('key', 'value'); // Use await for Redis operations
    console.log('Data stored in Redis');
  } catch (error) {
    console.error('Redis Error:', error);
  }
}

setRedisValue(); // Call the function to set the value

export default client ;
