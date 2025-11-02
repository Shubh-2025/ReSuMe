import { Router } from 'express';

import homeHandler from '../controllers/homeHandler.js';
import generateHandler from '../controllers/generateHandler.js';
import resumeHandler from '../controllers/resumeHandler.js';
import loginHandler from '../controllers/loginHandler.js';
import registerHandler from '../controllers/registerHandler.js';
import editHandler from '../controllers/editHandler.js';
import dashboardHandler from '../controllers/dashboardHandler.js';
import userresumesHandler from '../controllers/userresumesHandler.js';

const router = Router();

//api routes exposed to the frontend
router.route('/').get(homeHandler);
router.route('/format').post(generateHandler);
router.route('/generate/:uid/:id').get(resumeHandler);
router.route('/login').post(loginHandler);
router.route('/regsiter').post(registerHandler);
router.route('/edit').post(editHandler);
router.route('/dashboard/:uid').get(dashboardHandler);
router.route('/userresumes/:uid').get(userresumesHandler);
// fallback route
router.use((req, res) => {
    res.status(404).send("404 Not found");
});

export default router;