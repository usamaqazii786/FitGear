import connectDb from "../utils/connectDb";
import Users from "../models/Users";
import jwt from "jsonwebtoken";
const express = require('express');
// const app = express();

connectDb();

const JwtKey = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const user = new Users(req.body);
      let result = await user.save();
      result = result.toObject();
      delete result.password;

      jwt.sign({ result }, JwtKey, { expiresIn: "2d" }, (err, token) => {
        if (err) return res.status(500).send({ result: "Error generating token" });

        res.status(200).json({ result, auth: token });
      });
    } catch (error) {
      console.error("Error in /register:", error);
      res.status(500).send("An error occurred");
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}


// app.listen(5000, () => {
//     console.log('Server is running on http://localhost:5000');
//   });