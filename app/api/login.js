import connectDb from "../../utils/connectDb";
import Users from "../../models/Users";
import jwt from "jsonwebtoken";

connectDb();

const JwtKey = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ result: "Invalid credentials" });
    }

    try {
      const user = await Users.findOne({ email, password }).select("-password");
      if (user) {
        jwt.sign({ user }, JwtKey, { expiresIn: "2d" }, (err, token) => {
          if (err) return res.status(500).send({ result: "Error generating token" });

          res.status(200).json({ user, auth: token });
        });
      } else {
        res.status(400).json({ result: "No User Found" });
      }
    } catch (error) {
      console.error("Error in /login:", error);
      res.status(500).send("Server Error");
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
