import { Router} from "express";
// import cartManage from "../managers/cartManage.js";
// import productManage from "../managers/productManage.js";
import cartDao from "../dao/cart.dao.js";
import productDao from "../dao/product.dao.js"
import { checkProductAndCart } from "../middlewares/checkProductAndCart.middleware.js";
import { cartModel } from "../dao/models/cart.model.js";

const router = Router();

router.post("/", async (req,res) => {
  try {
    const body = req.body;
    // cambiamos por nuestros DAOS
    // const cart = await cartManage.createCart(body); 
    const cart = await cartDao.create();

    res.status(201).json({status: "ok", cart});
  
  } catch (error) {
    console.log(error);
    res.status(500).json({status:"error", msg: "Error interno del servidor"});
  }
})


router.get("/:cid", async (req,res) => {
  try {
    const {cid} = req.params;
    // Cambiamos por neustro DAO
    // const cart = await cartManage.getCartById(cid);
    const cart = await cartDao.getById(cid);

    if (!cart) return res.status(404).json({status:"error", msg:"Carrito no encontrado"});

    res.status(201).json({status: "ok", cart});
  
  } catch (error) {
    console.log(error);
    res.status(500).json({status:"error", msg: "Error interno del servidor"});
  }
})

router.post("/:cid/product/:pid", checkProductAndCart, async (req,res) => {
  try {
    const {cid, pid} = req.params;

    const cart = await cartDao.addProductToCart(cid, pid);
    res.status(201).json({status: "ok", cart});
  
  } catch (error) {
    console.log(error);
    res.status(500).json({status:"error", msg: "Error interno del servidor"});
  }
})

router.delete("/:cid/product/:pid", checkProductAndCart, async (req,res) => {
  try {
    const {cid, pid} = req.params;
    const cart = await cartDao.deleteProductInCart(cid, pid);

    res.status(201).json({status: "ok", cart});
  
  } catch (error) {
    console.log(error);
    res.status(500).json({status:"error", msg: "Error interno del servidor"});
  }
})

router.put("/:cid/product/:pid", checkProductAndCart, async (req,res) => {
  try {
    const {cid, pid} = req.params;
    const { quantity } = req.body;
    const cart = await cartDao.updateQuantityProductInCart(cid, pid, quantity);

    res.status(201).json({status: "ok", cart});
  
  } catch (error) {
    console.log(error);
    res.status(500).json({status:"error", msg: "Error interno del servidor - router.put(/:cid/product/:pid"});
  }
})

router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartDao.getById(cid);
    if (!cart) return res.status(404).json({ status: "error", msg: "Carrito no encontrado" });

    const cartResponse = await cartDao.deleteAllProductsInCart(cid);

    res.status(201).json({ status: "ok", cart: cartResponse });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Error interno del servidor" });
  }
});

export default router;
