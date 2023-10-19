import express from "express";
import fs from "fs";
import multer from "multer";
import cors from "cors";
import { validationResult } from "express-validator";

import mongoose from "mongoose";

import { registerValidation } from "./validations/auth.js";

const app = express();
mongoose
  .connect(
    "mongodb+srv://alex:mJ718spWn4WZj8pN@cluster0.3ryry0y.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB OK");
  })
  .catch(() => {
    console.log("DB error");
  });

app.use(express.json());
app.use(cors());

app.post("/auth/register", registerValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  res.json({ success: true });
});

app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
