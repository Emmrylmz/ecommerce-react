import express from 'express';
import cache from 'redis'; // Choose your caching library

const client = cache.createClient();

export default function cacheMiddleware(req, res, next) {
  const key = req.originalUrl; // Define your cache key logic (e.g., URL, params)

  client.get(key, async (err, cachedData) => {
    if (err) {
      console.error(err);
      return next(err); // Handle errors
    }

    if (cachedData) {
      // Send cached data if present
      console.log('Serving data from cache');
      return res.send(JSON.parse(cachedData));
    }

    try {
      const response = await fetch(req.originalUrl);
      const data = await response.json();

      // Set cache with a predefined TTL
      await client.set(key, JSON.stringify(data), 60 * 60); // 1 hour TTL

      // Send data and proceed to next middleware
      res.send(data);
      next();
    } catch (error) {
      console.error(error);
      next(error); // Handle fetch errors
    }
  });
}

