import bcrypt from "bcrypt";
import { pool } from "../db.js";
import { createAccessToken } from "../libs/jwt.js";
import md5 from "md5";


export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });
    const validPassword = await bcrypt.compare(
      password,
      result.rows[0].password
    );

    if (!validPassword)
      return res.status(400).json({ message: "Contraseña incorrecta" });
      const token = await createAccessToken({ id: result.rows[0].id });
      res.cookie("token", token, {
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        
      });
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al iniciar sesión" });
    next(error);
  }
};
export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarUrl = `https://www.gravatar.com/avatar/${md5(email)}?d=identicon`;
    const result = await pool.query(
      "INSERT INTO users (username, email, password, gravatar) VALUES ($1, $2, $3, $4) RETURNING *",
      [username, email, hashedPassword, avatarUrl]
    );
    const token = await createAccessToken({ id: result.rows[0].id });
    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(result.rows[0]);
    //res.send(`Registrando usuario ${username} con email ${email}`);
  } catch (error) {
   if (error.code === "23505") {
      return res.status(400).json({ message: "Ya existe un usuario con ese email" });
    }
    next(error);
  }
};
export const signout = (req, res) => {
  res.clearCookie("token");
  return res.json({ message: "Sesión cerrada" });
};
export const profile = async (req, res) => {
  try {
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [req.userID]);
    return res.json(user.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener el perfil del usuario" });
  }
};
