import routerx from "express-promise-router";
import userRouter from './userRouter';
import shopCategoriesRouter from './shopCategoryRouter';
const router = routerx();

// centralizar rutas
router.use('/users', userRouter);
router.use('/categories', shopCategoriesRouter);

export default router;