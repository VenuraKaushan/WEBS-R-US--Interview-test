import pool from "../configs/dbConfig.js";

//get boxes dimensions
export const getBoxes = async (req, res) => {
  try {

    const result = await pool.query("SELECT * FROM box_types");
    res.json(result.rows);

  } catch (error) {
    console.error("Error fetching box types:", error);
    res.status(500).json({ error: "Database error" });
  }
};
