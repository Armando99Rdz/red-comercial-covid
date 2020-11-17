import routerx from "express-promise-router";
import userController from '../controllers/userController';
import userSchema from '../helpers/validations/userSchema';
import dataValidation from '../middlwares/dataValidation';
import auth from '../middlwares/authentication';

const router = routerx();

router.post('/login', userController.login);
router.get('/list', auth.verifyAdmin, userController.index);
router.post('/create', auth.verifyUser, dataValidation(userSchema.store), userController.store);
router.get('/show', auth.verifyUser, userController.show);
router.put('/update', auth.verifyUser, dataValidation(userSchema.update), userController.update);
router.put('/update/address', auth.verifyUser, userController.updateAddresses);
router.delete('/delete', auth.verifyAdmin, userController.delete);

export default router;