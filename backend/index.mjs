import mongoose from "mongoose";
import morgan from "morgan";
import * as dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import postRouter from "./routes/post.mjs";
import cors from "cors";

dotenv.config()
const app = express();

app.use(morgan.dev());
app.use(cors());
app.use(bodyParser());

app.use('/api', postRouter);

if (process.env.NODE_ENV === 'production') {
    //*Set static folder up in production
    app.use(express.static('../frontend/build'));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, '../frontend', 'build','index.html')));
  }


const port = process.env.PORT || 8080;
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true}).then(
    app.listen(port, ()=>{
        console.log(`listening on ${process.env.PORT}`);
    }));