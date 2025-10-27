import express from 'express';
import cors from 'cors';
import pool from './db.js';
import router from './routes/routes.js';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors({
    origin: ["http://localhost:5173"],
    // credentials: true
}));
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cookieParser());

app.use("/", router);

async function main() { // entry point of the application
    try {
        app.listen(PORT, () => {
            console.log('Server is listening and serving on port ', PORT);
        });
    }
    catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}
main();