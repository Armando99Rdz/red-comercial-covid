import routerx from "express-promise-router";
import userRouter from './userRouter';
import shopCategoriesRouter from './shopCategoryRouter';
import shopsRouter from './shopRouter';
import articleRouter from "./articleRouter";
import orderRouter from "./orderRouter";

const router = routerx();

// centralizar rutas
router.use('/users', userRouter);
router.use('/categories', shopCategoriesRouter);
router.use('/shops', shopsRouter);
router.use('/articles', articleRouter);
router.use('/orders', orderRouter);

export default router;