import pool from '../db.js';
import errorHandler from '../error.js';

const editHandler = async (req, res) => {
    try {
        let {
            name,
            title,
            contact,
            skills,
            profile,
            experience,
            education,
            templateId,
            uid, id
        } = req.body;
        console.log(req.body);
        experience = experience.map((exp) => JSON.stringify(exp));
        // console.log(experience);
        education = education.map((edu) => JSON.stringify(edu));
        // console.log(education);
        if (!uid || !templateId) {
            return res.status(400).json({ message: "userID and templateID is required." });
        }

        await pool.query(
            "update resumes set name=$1, title=$2,phone=$3, email=$4,address=$5, skills=$6, profile=$7, experience=$8, education=$9 where uid=$10 and tid=$11 and id=$12", [name, title, contact.phone, contact.email, contact.address, skills, profile, experience, education, uid, templateId, id]);
        return res.status(200).json({
            message: "Resume updated successfully!",
        });
    } catch (err) {
        console.error(err.message);
        errorHandler(res);
    }
};
export default editHandler;