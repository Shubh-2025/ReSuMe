// controllers/resumeController.js
import errorHandler from "../error.js";
import pool from "../db.js";

const generateHandler = async (req, res) => {
    try {
        const {
            name,
            title,
            contact,
            skills,
            profile,
            experience,
            education,
            tid,
            uid
        } = req.body;
        console.log(req.body);

        const response = await pool.query(
            "INSERT INTO resumes (uid,tid,name, title,phone, email,address, skills, profile, experience, education) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9 ,$10,$11) RETURNING id", [uid, tid, name, title, contact.phone, contact.email, contact.address, skills, profile, experience, education]);

        if (!response.rows[0]?.id) {
            return res.status(401).json({
                message: "Failed to save resume data."
            });
        }
        return res.status(201).json({
            message: "Resume data received successfully!",
        });
    } catch (err) {
        console.error(err.message);
        errorHandler(res);
    }
};

export default generateHandler;