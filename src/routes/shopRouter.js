import routerx from "express-promise-router";
import shopController from "../controllers/shopController";
import shopSchema from "../helpers/validations/shopSchema";
import dataValidation from "../middlwares/dataValidation";
import auth from '../middlwares/authentication';

const router = routerx();

router.get('/list', auth.verifyUser, shopController.index);
router.post('/create', auth.verifyUser, dataValidation(shopSchema.store), shopController.store);
router.get('/show', auth.verifyUser, shopController.show);
router.put('/update', auth.verifyComerciante, dataValidation(shopSchema.updateBaseInfo), shopController.updateBaseInfo);
router.put('/address', auth.verifyComerciante, dataValidation(shopSchema.updateAddress), shopController.updateAddress);
router.put('/images', auth.verifyComerciante, dataValidation(shopSchema.updateImages), shopController.updateImages);
router.put('/categories', auth.verifyComerciante, dataValidation(shopSchema.updateCategories), shopController.updateCategories);
router.put('/state', auth.verifyComerciante, shopController.changeState);
router.delete('/delete', auth.verifyAdmin, shopController.delete);
router.get('/show/:url', auth.verifyUser, shopController.showUsingUrl);
export default router;