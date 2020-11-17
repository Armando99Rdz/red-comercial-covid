import routerx from "express-promise-router";
import articleController from "../controllers/articleController";
import dataValidation from "../middlwares/dataValidation";
import articleSchema from "../helpers/validations/articleSchema";
import auth from '../middlwares/authentication';

const router = routerx();

router.get('/list',
 auth.verifyUser, articleController.index);
router.post('/create', 
  auth.verifyComerciante, dataValidation(articleSchema.store), articleController.store);
router.get('/show', 
  auth.verifyUser, articleController.show);
router.put('/update', 
  auth.verifyComerciante, dataValidation(articleSchema.updateBaseInfo), articleController.updateBaseInfo);
router.put('/images', 
  auth.verifyComerciante, dataValidation(articleSchema.updateImages), articleController.updateImages);
router.put('/state', 
  auth.verifyComerciante, articleController.changeState);
router.get('/show/:url',
  auth.verifyUser, articleController.showUsingUrl);

export default router;