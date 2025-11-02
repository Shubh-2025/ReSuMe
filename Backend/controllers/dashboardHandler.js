import pool from "../db.js";
import errorHandler from "../error.js";

const dashboardHandler = async (req, res) => {
    try {
        const { uid } = req.params;
        const { rows } = await pool.query(
            "SELECT name FROM r_users WHERE id = $1",
            [uid]
        );
        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(rows[0].name);
        return res.status(200).json(rows[0]);
    } catch (error) {
        return errorHandler(res, error);
    }
};

export default dashboardHandler;