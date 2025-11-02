import errorHandler from "../error.js";
import pool from "../db.js";

const resumeHandler = async (req, res) => {
    let { uid, id } = req.params;
    try {
        const response = await pool.query("SELECT * FROM resumes where uid=$1 and id=$2 limit 100", [uid, id]);
        if (response.rows.length === 0) {
            return res.status(404).json({ message: "Resume not found" });
        }
        console.log(response.rows[0]);
        res.status(200).json({ message: response.rows[0] });
    }
    catch (err) {
        console.error(err.message);
        errorHandler(res);
    }
}
export default resumeHandler;