import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import checkAuth from "./utils/checkAuth.js";
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations.js";
import { UserController, PostController } from "./controllers/index.js";

mongoose
  .connect(
    "mongodb+srv://alex:mJ718spWn4WZj8pN@cluster0.3ryry0y.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB OK");
  })
  .catch(() => {
    console.log("DB error");
  });

const app = express();
app.use(express.json());
app.use(cors());

app.post("/auth/login", loginValidation, UserController.login);
app.post("/auth/register", registerValidation, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", checkAuth, postCreateValidation, PostController.create);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch("/posts/:id", checkAuth, PostController.update);

app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
