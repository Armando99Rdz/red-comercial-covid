import routerx from "express-promise-router";
import orderController from "../controllers/orderController";
import dataValidation from "../middlwares/dataValidation";
import auth from '../middlwares/authentication';

const router = routerx();

router.get('/list', auth.verifyComerciante, orderController.index);
router.post('/create', auth.verifyComerciante, orderController.store);
router.get('/show', auth.verifyUser, orderController.show);
router.put('/update', auth.verifyComerciante, orderController.update);
router.put('/status', auth.verifyComerciante, orderController.updateStatus);
router.put('/state', auth.verifyComerciante, orderController.changeState);
router.delete('/delete', auth.verifyAdmin, orderController.delete);
export default router;