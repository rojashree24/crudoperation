import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose";

import userRoutes from './routes/user.js'
import postRoutes from './routes/post.js'


const app=express();
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


app.use("/", userRoutes);
app.use("/",postRoutes)


const PORT=process.env.PORT || 8000;

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));