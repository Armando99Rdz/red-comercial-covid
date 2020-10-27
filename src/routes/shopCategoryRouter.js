import routerx from "express-promise-router";
import shopCategoriesController from '../controllers/shopCategoriesController';
import dataValidation from '../middlwares/dataValidation';

const router = routerx();

router.get('/list', shopCategoriesController.index);
router.post('/create', shopCategoriesController.store);
router.get('/show', shopCategoriesController.show);
router.put('/update', shopCategoriesController.update);
router.put('/state', shopCategoriesController.changeState);
router.delete('/delete', shopCategoriesController.delete);
export default router;