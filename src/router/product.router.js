import { Router} from "express"
// import productManage from "../managers/productManage.js";
import { checkProductData } from "../middlewares/checkProductData.middleware.js";
import productDao from "../dao/product.dao.js";

const router = Router();

router.get("/", async (req, res) => {
  try {

    const {limit, page, sort, category, status} = req.query;

    const options = {
      limit: limit || 10,
      page: page || 1,
      sort: {price: sort === "asc" ? 1 : -1},
      learn: true
    }

    if (status){
      const products = await productDao.getAll({status}, options);
      return res.status(200).json({status: "ok", products});
    }

    if (category){
      const products = await productDao.getAll({category}, options);
      return res.status(200).json({status: "ok", products});
    }

    const products = await productDao.getAll({}, options);

    if (!products) return res.status(404),json({status:"error", msg:"Productos no encontrados"});
  
    res.status(200).json({status: "ok", products});
    
  } catch (error) {
    console.log(error);
    res.status(500).json({status:"error", msg: "Error interno del servidor"});
  }
});
  
router.get("/:pid", async (req, res) => {
try {
  const { pid } = req.params;
  // Cambiamos por nuestro DAO
  // const product = await productManage.getProductById(pid);
  const product = await productDao.getById(pid);

  if (!product) return res.status(404).json({status:"error", msg:"Producto no encontrado"});

  res.status(200).json({status: "ok", product});
  // res.send(product);
} catch (error) {
  console.log(error);
  res.status(500).json({status:"error", msg: "Error interno del servidor router.get(/products/:pid"});
}
});
  
router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const body = req.body;
try {
  // Cambiamos por nuestro DAO
  // const product = await productManage.getProductById(pid);
  // const productFind = await productDao.getById(pid);
  // if (!productFind) return res.status(404).json({status:"error", msg:"Producto no encontrado"});
  // Cambiamos por nuestro DAO
  // await productManage.updateProduct(pid, body );

  const product = await productDao.update( pid, body );
  res.status(200).json({status: "ok", product});

} catch (error) {
  console.log(error);
  res.status(500).json({status:"error", msg: "Error interno del servidor"});
}
});
  
router.post("/", checkProductData, async (req, res) => {
  try {
    const body = req.body;
    // Cambiamos por nuestro DAO
    // const product = await productManage.addProduct(body);
    const product = await productDao.create(body);
    res.status(201).json({status: "ok", product});

  } catch (error) {
    console.log(error);
    res.status(500).json({status:"error", msg: "Error interno del servidorr"});
  }
});
  
router.delete("/:pid", async (req, res) => {
  try {

    const { pid } = req.params;
    const product = await productDao.getById(pid);
    if (!product) return res.status(404).json({status:"error", msg:"Producto no encontrado"});

    await productDao.deleteOne(pid);
    res.status(201).json({status: "ok", msg: `Producto con el id ${pid} eliminado con exito`});

  } catch (error) {
    console.log(error);
    res.status(500).json({status:"error", msg: "Error interno del servidor"});
  }
})

export default router;