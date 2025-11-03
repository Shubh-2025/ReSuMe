import pool from '../db.js';
import errorHandler from '../error.js';

const loginHandler = async (req, res) => {
    // Logic for handling login
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ message: 'Email and password are required' });
        }
        // Authenticate user (this is just a placeholder logic)
        let { rows } = await pool.query('SELECT * FROM r_users WHERE email = $1 AND password = $2', [email, password]);
        if (email === rows[0].email && password === rows[0].password) {
            res.status(200).send({ message: 'Login successful', id: rows[0].id });
        } else {
            res.status(400).send({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error.message);
        errorHandler(res);
    }
}

export default loginHandler;