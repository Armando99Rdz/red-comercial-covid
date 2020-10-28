import routerx from "express-promise-router";
import articleController from "../controllers/articleController";
import dataValidation from "../middlwares/dataValidation";
import articleSchema from "../helpers/validations/articleSchema";

const router = routerx();

router.get('/list', articleController.index);
router.post('/create', dataValidation(articleSchema.store), articleController.store);
router.get('/show', articleController.show);
router.put('/update', dataValidation(articleSchema.updateBaseInfo), articleController.updateBaseInfo);
router.put('/images', dataValidation(articleSchema.updateImages), articleController.updateImages);
router.put('/state', articleController.changeState);
router.get('/show/:url', articleController.showUsingUrl);
export default router;