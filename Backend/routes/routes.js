import { Router } from 'express';

import homeHandler from '../controllers/homeHandler.js';
import generateHandler from '../controllers/generateHandler.js';
import resumeHandler from '../controllers/resumeHandler.js';
import loginHandler from '../controllers/loginHandler.js';
import registerHandler from '../controllers/registerHandler.js';
import editHandler from '../controllers/editHandler.js';

const router = Router();

//api routes exposed to the frontend
router.route('/').get(homeHandler);
router.route('/format').post(generateHandler);
router.route('/generate/:uid').get(resumeHandler);
router.route('/login').post(loginHandler);
router.route('/regsiter').post(registerHandler);
router.route('/edit').post(editHandler);

// fallback route
router.use((req, res) => {
    res.status(404).send("404 Not found");
});

export default router;