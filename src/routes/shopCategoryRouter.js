import routerx from "express-promise-router";
import shopCategoriesController from '../controllers/shopCategoriesController';
import shopCategorySchema from "../helpers/validations/shopCategorySchema";
import dataValidation from '../middlwares/dataValidation';
import auth from '../middlwares/authentication';

const router = routerx();

router.get('/list', auth.verifyUser, shopCategoriesController.index);
router.post('/create', auth.verifyAdmin, dataValidation(shopCategorySchema.store), shopCategoriesController.store);
router.get('/show', auth.verifyUser, shopCategoriesController.show);
router.put('/update', auth.verifyAdmin, dataValidation(shopCategorySchema.update), shopCategoriesController.update);
router.put('/state', auth.verifyAdmin, shopCategoriesController.changeState);
router.delete('/delete', auth.verifyAdmin, shopCategoriesController.delete);
router.get('/show/:url', auth.verifyUser, shopCategoriesController.showUsingUrl);
export default router;