import routerx from "express-promise-router";
import shopCategoriesController from '../controllers/shopCategoriesController';
import shopCategorySchema from "../helpers/validations/shopCategorySchema";
import dataValidation from '../middlwares/dataValidation';

const router = routerx();

router.get('/list', shopCategoriesController.index);
router.post('/create', dataValidation(shopCategorySchema.store), shopCategoriesController.store);
router.get('/show', shopCategoriesController.show);
router.put('/update', dataValidation(shopCategorySchema.update), shopCategoriesController.update);
router.put('/state', shopCategoriesController.changeState);
router.delete('/delete', shopCategoriesController.delete);
export default router;