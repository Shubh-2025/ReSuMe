import pool from '../db.js';
import errorHandler from '../error.js';

const homeHandler = async (req, res) => {
    try{
    const response = pool.query("SELECT name, cuisine, recipe, imageurl FROM recipes LIMIT 20");
    } catch (err) {
        console.error(err.message);
        errorHandler(res);
    }
}

export default homeHandler;