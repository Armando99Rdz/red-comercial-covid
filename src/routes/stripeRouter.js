import routerx from "express-promise-router";
import stripeController from "../controllers/stripeController";
import auth from '../middlwares/authentication';

const router = routerx();
router.post('/create-payment-intent', auth.verifyUser, stripeController.createSession);

export default router;