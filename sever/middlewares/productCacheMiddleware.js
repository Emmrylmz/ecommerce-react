import express from 'express';
import client from '../redis.js';
import fetch from 'node-fetch';


export default async function cacheMiddleware(req, res, next) {

  try {
    const cachedData = await client.get("1");

    if (cachedData) {
      console.log('Serving data from cache');

      next()
    } else {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();

      await client.set(key, JSON.parse(data), 60 * 60); // Cache raw data
      next()
    }
  } catch (error) {
    console.error("Error in cache middleware:", error);
    // Handle the error gracefully, e.g., send a custom error response
  }
}