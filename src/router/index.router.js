import productsRouter from "../router/product.router.js";
import cartsRouter from "../router/cart.router.js";
import { Router } from "express";

const router = Router();

router.use("/products", productsRouter);
router.use("/carts", cartsRouter)

export default router;
