import routerx from "express-promise-router";

import stripeController from "../controllers/stripeController";

const router = routerx();
router.post('/create-payment-intent', stripeController.createSession);

export default router;