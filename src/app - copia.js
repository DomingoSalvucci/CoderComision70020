import express from "express"
import productManage from "./managers/productManage.js";
import hasPropertyDescriptors from "has-property-descriptors";
const PORT = 8080;
const app = express();
app.use(express.json());
// app.use(express.urlencoded({extended:true}));

app.get("/products", async (req, res) => {
try {
  const products = await productManage.getProducts();
  if (!products) return res.status(404),json({status:"error", msg:"Productos no encontrados"});

  res.status(200).json({status: "ok", products});
  // res.send(products);
  
} catch (error) {
  console.log(error);
  res.status(500).json({status:"error", msg: "Error interno del servidor"});

}

});

app.get("/products/:pid", async (req, res) => {
try {
  const { pid } = req.params;
  const product = await productManage.getProductById(Number(pid));
  console.log(product);
  if (!product) return res.status(404).json({status:"error", msg:"Producto no encontrado"});

  res.status(200).json({status: "ok", product});
  // res.send(product);
} catch (error) {
  console.log(error);
  res.status(500).json({status:"error", msg: "Error interno del servidor"});

}

});

app.put("/products/:pid", async (req, res) => {
try {
  const { pid } = req.params;
  const { price, title } = req.query;

  const product = await productManage.getProductById(Number(pid));
  if (!product) return res.status(404).json({status:"error", msg:"Producto no encontrado"});

  await productManage.updateProduct(Number(pid), {price:Number(price), title: title});
  res.status(200).json({status: "ok", product});
  // res.send(product);

} catch (error) {
  console.log(error);
  res.status(500).json({status:"error", msg: "Error interno del servidor"});
}
});

app.post("/products", async (req, res) => {
  try {
    const body = req.body;
    const product = await productManage.addProduct(body);

    res.status(201).json({status: "ok", product});

  } catch (error) {
    console.log(error);
    res.status(500).json({status:"error", msg: "Error interno del servidor"});
  }
});

app.delete("/products/:pid", async (req, res) => {
  try {

    const { pid } = req.params;
    const product = await productManage.getProductById(Number(pid));
    if (!product) return res.status(404).json({status:"error", msg:"Producto no encontrado"});

    await productManage.deleteProduct(Number(pid));

    res.status(201).json({status: "ok", msg: `Producto con el id ${pid} eliminado con exito`});

  } catch (error) {
    console.log(error);
    res.status(500).json({status:"error", msg: "Error interno del servidor"});
  }
})



app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});


