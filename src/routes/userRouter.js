import routerx from "express-promise-router";
import userController from '../controllers/userController';
import userSchema from '../helpers/validations/userSchema';
import dataValidation from '../middlwares/dataValidation';

const router = routerx();

router.get('/list', userController.index);
router.post('/create', dataValidation(userSchema.store), userController.store);
router.get('/show', userController.show);
router.put('/update', dataValidation(userSchema.update), userController.update);
router.put('/update/address', userController.updateAddresses);
router.delete('/delete', userController.delete);
export default router;