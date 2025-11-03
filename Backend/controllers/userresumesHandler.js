import errorHandler from "../error.js";
import pool from "../db.js";

const userresumesHandler = async (req, res) => {
    let { uid } = req.params;
    try {
        const response = await pool.query("SELECT * FROM resumes where uid=$1 limit 100", [uid]);
        if (response.rows.length === 0) {
            return res.status(404).json({ message: "Resume not found" });
        }
        // console.log(response.rows);
        res.status(200).json({ message: response.rows });
    }
    catch (err) {
        console.error(err.message);
        errorHandler(res);
    }
}
export default userresumesHandler;