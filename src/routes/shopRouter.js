import routerx from "express-promise-router";
import shopController from "../controllers/shopController";
import shopSchema from "../helpers/validations/shopSchema";
import dataValidation from "../middlwares/dataValidation";

const router = routerx();

router.get('/list', shopController.index);
router.post('/create', dataValidation(shopSchema.store), shopController.store);
router.get('/show', shopController.show);
router.put('/update', dataValidation(shopSchema.updateBaseInfo), shopController.updateBaseInfo);
router.put('/address', dataValidation(shopSchema.updateAddress), shopController.updateAddress);
router.put('/images', dataValidation(shopSchema.updateImages), shopController.updateImages);
router.put('/categories', dataValidation(shopSchema.updateCategories), shopController.updateCategories);
router.put('/state', shopController.changeState);
router.delete('/delete', shopController.delete);
router.get('/show/:url', shopController.showUsingUrl);
export default router;