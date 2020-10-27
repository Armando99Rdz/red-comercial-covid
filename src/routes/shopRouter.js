import routerx from "express-promise-router";
import shopController from "../controllers/shopController";
import dataValidation from "../middlwares/dataValidation";

const router = routerx();

router.get('/list', shopController.index);
router.post('/create', dataValidation(shopController.store), shopController.store);
router.get('/show', shopController.show);
router.put('/update', shopController.updateBaseInfo);
router.put('/address', shopController.updateAddress);
router.put('/state', shopController.changeState);
router.delete('/delete', shopController.delete);
export default router;