import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config.js";


export const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    }, (err, token) => {
      if (err) return reject(err);
      resolve(token);
    });
  });
};
