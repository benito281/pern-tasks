import { pool } from "../db.js";
//TODO: Ver video de FAZT en el minuto 2:39:37 para continuar con el tutorial

// Obtener todas las tareas
export const getAllTasks = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [req.userID]);
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    //res.status(500).json({ message: "Error al obtener las tareas" });
    next(error);
  }
};
// Obtener una tarea por su ID
export const getTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM tasks WHERE id = $1 AND user_id = $2", [id, req.userID]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Crear una nueva tarea
export const createTask = async (req, res, next) => {
  const { title, description } = req.body;
  console.log(req.userID);
  
  try {
    const result = await pool.query(
      "INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *", //Guardamos la tarea creada y devuelvemos esa misma tarea
      [title, description, req.userID]
    );
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      // Código de error para violación de restricción única en PostgreSQL
      return res
        .status(409)
        .json({ message: "Ya existe una tarea con este título." });
    }
    console.error(error);
    //res.status(500).json({ message: "Error al crear la tarea" });
    next(error);
  }
};
// Actualizar una tarea existente
export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const result = await pool.query(
      "UPDATE tasks SET title = $1, description= $2 WHERE id = $3 AND user_id = $4 RETURNING *",
      [title, description, id, req.userID]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    return res.status(200).json({ message: "Tarea actualizada con exito" });
  } catch (error) {
    if (error.code === "23505") {
      // Código de error para violación de restricción única en PostgreSQL
      return res
        .status(409)
        .json({ message: "Ya existe una tarea con este título." });
    }
    console.error(error);
    next(error);
  }
};
// Eliminar una tarea
export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM tasks WHERE id = $1 AND user_id = $2", [id, req.userID]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    return res.status(204).json({ message: "Tarea eliminada con exito" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
