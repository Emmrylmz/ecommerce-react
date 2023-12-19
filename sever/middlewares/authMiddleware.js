import jwt  from "jsonwebtoken";
import {} from 'dotenv/config'

export default function verifyToken(req, res, next) {
const token = req.header('Authorization');
if (!token) return res.status(401).json({ error: 'Access denied' });
try {
 const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
 req.userId = decoded.userId;
 console.log("decoded")
 next();
 } catch (error) {
 res.status(401).json({ error: 'Invalid token' });
 }
 };