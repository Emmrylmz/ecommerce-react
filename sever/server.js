import express from 'express'
const app = express()
const port = 3000
import connectDB from './db/database.js'
import router from './routes/authRoute.js'
import { config } from 'dotenv';
// fetch-polyfill.js
import fetch, {
    Blob,
    blobFrom,
    blobFromSync,
    File,
    fileFrom,
    fileFromSync,
    FormData,
    Headers,
    Request,
    Response,
  } from 'node-fetch'
import  cors  from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
const url = process.env.DATA_SOURCE
import cacheMiddleware from './middlewares/productCacheMiddleware.js'
import client from './redis.js'

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use('/', router);




export async function getData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle and log the error
    console.error(error);
    // Optionally return a specific error response
    return { error: error.message };
  }
}
export const getProducts = async (req, res) => {
  const response = await fetch('/product');
  const products = await response.json();
  // Use the products array in your controller logic
  res.send(products);
};

connectDB().then(app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)    //Connect mongoDB
})  )

 app.get('/product', async (req, res) => {      //query all the products
  getData(url)
})




app.get('/product/:id', async (req, res) => {   //query Product with id
    const productId = req.params.id;
        getData(`${url}/${productId}`)
        
})


