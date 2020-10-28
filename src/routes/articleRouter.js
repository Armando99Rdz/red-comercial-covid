import routerx from "express-promise-router";
import articleController from "../controllers/articleController";
import dataValidation from "../middlwares/dataValidation";

const router = routerx();

router.get('/list', articleController.index);
router.post('/create', articleController.store);
router.get('/show', articleController.show);
router.put('/update', articleController.updateBaseInfo);
router.put('/images', articleController.updateImages);
router.put('/state', articleController.changeState);
export default router;