import express from 'express' ;
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoute from './route/userRoute.js'
import messageRoute from './route/messageRoute.js'
import { app,server } from './socketIO/server.js';
import path from 'path';

// const app = express();
dotenv.config();

const port = 4002;
const mongo_uri = process.env.MONGODB_URI;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

try {
  mongoose.connect(mongo_uri);
  console.log('db connected!');
} catch (error) {
  console.log(error);
}

app.use('/api/user',userRoute);
app.use('/api/message',messageRoute);

if(process.env.NODE_ENV === 'production'){
  const dirPath = path.resolve();
  app.use(express.static("./Frontend/dist"));
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(dirPath,"./Frontend/dist","index.html"));
  })
}

server.listen(port,()=>{
  console.log(`app listening on port ${port}`);
})