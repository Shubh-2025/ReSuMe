import pool from '../db.js';
import errorHandler from '../error.js';

const homeHandler = async (req, res) => {
    try {
        const response = await pool.query("select * from resumes limit 1");
    } catch (err) {
        console.error(err.message);
        errorHandler(res);
    }
}

export default homeHandler;