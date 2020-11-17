import routerx from "express-promise-router";
import userRouter from './userRouter';
import shopCategoriesRouter from './shopCategoryRouter';
import shopsRouter from './shopRouter';
import articleRouter from "./articleRouter";
import orderRouter from "./orderRouter";
import stripeRouter from "./stripeRouter";

const router = routerx();

// centralizar rutas
router.use('/users', userRouter);
router.use('/categories', shopCategoriesRouter);
router.use('/shops', shopsRouter);
router.use('/articles', articleRouter);
router.use('/orders', orderRouter);
router.use('/stripe', stripeRouter);


export default router;