import routerx from "express-promise-router";
import orderController from "../controllers/orderController";
import dataValidation from "../middlwares/dataValidation";

const router = routerx();

router.get('/list', orderController.index);
router.post('/create', orderController.store);
router.get('/show', orderController.show);
router.put('/update', orderController.update);
router.put('/status', orderController.updateStatus);
router.put('/state', orderController.changeState);
router.delete('/delete', orderController.delete);
export default router;