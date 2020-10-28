import routerx from "express-promise-router";
import userRouter from './userRouter';
import shopCategoriesRouter from './shopCategoryRouter';
import shopsRouter from './shopRouter';
import articleRouter from "./articleRouter";

const router = routerx();

// centralizar rutas
router.use('/users', userRouter);
router.use('/categories', shopCategoriesRouter);
router.use('/shops', shopsRouter);
router.use('/articles', articleRouter);

export default router;