import pool from '../db.js';
import errorHandler from '../error.js';

const registerHandler = async (req, res) => {
    // Logic for handling login
    try {
        const { name, email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ message: 'Email and password are required' });
        }
        // Authenticate user (this is just a placeholder logic)
        let { rows } = await pool.query('SELECT email FROM r_users WHERE email = $1', [email]);
        if (rows.length > 0) {
            return res.status(400).send({ message: 'User With this email already exists' });
        }
        let data = await pool.query('INSERT INTO r_users (name, email, password) VALUES ($1, $2, $3) returning id', [name, email, password]);
        res.status(200).send({ message: 'Registration successful', id: data.rows[0].id });
    } catch (error) {
        console.error('Error during login:', error.message);
        errorHandler(res);
    }
}

export default registerHandler;