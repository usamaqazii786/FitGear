import jwt from "jsonwebtoken";

const JwtKey = process.env.JWT_SECRET;

export default async function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ result: "Please provide a token" });
  }

  try {
    jwt.verify(token, JwtKey, (err) => {
      if (err) {
        res.status(401).json({ result: "Invalid Token" });
      } else {
        next();
      }
    });
  } catch (error) {
    console.error("Error in token verification:", error);
    res.status(500).json({ error: "Server Error" });
  }
}
