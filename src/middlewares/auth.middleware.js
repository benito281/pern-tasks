import jwt from "jsonwebtoken";
import {ACCESS_TOKEN_SECRET} from "../config.js";

//Middleware para proteger rutas
export const isAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No autorizado" });
  }
  jwt.verify(token, ACCESS_TOKEN_SECRET,(err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido" });
    }
    req.userID = decoded.id;
    
    next();
  });
};
