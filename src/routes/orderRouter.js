import routerx from "express-promise-router";
import orderController from "../controllers/orderController";
import dataValidation from "../middlwares/dataValidation";

const router = routerx();

router.get('/list', orderController.index);
router.post('/create', orderController.store);
router.get('/show', orderController.show);
router.delete('/delete', orderController.delete);
export default router;