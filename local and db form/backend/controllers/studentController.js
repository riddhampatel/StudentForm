const pool = require("../db");

const getStudents = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM stu ORDER BY student_id DESC",
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting students" });
  }
};

const getStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query("SELECT * FROM stu WHERE student_id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error getting student",
    });
  }
};

const createStudent = async (req, res) => {
  try {
    const { name, email, course, address, dob } = req.body;

    const result = await pool.query(
      `INSERT INTO stu (name, email, course, address, dob)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
      [name, email, course, address, dob],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);

    if (error.code === "23505") {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    res.status(500).json({
      message: "Error adding student",
    });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, course, address, dob } = req.body;

    const result = await pool.query(
      `UPDATE stu
             SET name = $1, email = $2, course = $3, address = $4, dob = $5
             WHERE student_id = $6
             RETURNING *`,
      [name, email, course, address, dob, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Student not found to update",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating student",
    });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM stu WHERE student_id = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Student not found to delete",
      });
    }

    res.json({
      message: "Student deleted successfully",
      student: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting student",
    });
  }
};

module.exports = {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};
