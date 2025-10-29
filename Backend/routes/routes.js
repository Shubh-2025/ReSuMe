import { Router } from 'express';

import homeHandler from '../controllers/homeHandler.js';
import generateHandler from '../controllers/generateHandler.js';
import resumeHandler from '../controllers/resumeHandler.js';

const router = Router();

//api routes exposed to the frontend
router.route('/').get(homeHandler);
router.route('/format').post(generateHandler);
router.route('/generate').get(resumeHandler);

// fallback route
router.use((req, res) => {
    res.status(404).send("404 Not found");
});

export default router;