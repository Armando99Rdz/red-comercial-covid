import routerx from "express-promise-router";
import userRouter from './userRouter';
import shopCategoriesRouter from './shopCategoryRouter';
import shopsRouter from './shopRouter';
const router = routerx();

// centralizar rutas
router.use('/users', userRouter);
router.use('/categories', shopCategoriesRouter);
router.use('/shops', shopsRouter);

export default router;