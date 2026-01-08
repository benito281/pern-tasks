import bcrypt from "bcrypt";
import { pool } from "../db.js";
import { createAccessToken } from "../libs/jwt.js";

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
    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );
    const token = await createAccessToken({ id: result.rows[0].id });
    res.cookie("token", token, {
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(result.rows[0]);
    //res.send(`Registrando usuario ${username} con email ${email}`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al registrar el usuario" });
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
