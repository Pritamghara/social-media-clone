
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

// Routes
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';
import  ChatRoute from './Routes/ChatRoute.js'
import UploadRoute from './Routes/UploadRoute.js'

import MessageRoute from './Routes/MessageRoute.js'
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const app = express();

// provide images for post
app.use(express.static('public'))
app.use('/images',express.static("images"))
app.use(express.static(path.join(__dirname, 'public')));

// middleware
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use(cors());
dotenv.config();



mongoose
  .connect(process.env.MONGO_DB, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`));
  })
  .catch((error) => console.error('Error connecting to MongoDB:', error.message));


// usage of routes

// app.use('/',async(req,res)=>res.send('hello'))
app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/post', PostRoute);
app.use('/upload',UploadRoute)
app.use('/chat',ChatRoute)
app.use('/message',MessageRoute)
