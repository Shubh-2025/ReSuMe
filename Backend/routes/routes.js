import { Router } from 'express';

import homeHandler from '../controllers/homeHandler';

const router = Router();

router.route('/').get(homeHandler);

// fallback route
router.use((req, res) => {
    res.status(404).send("404 Not found");
});

export default router;