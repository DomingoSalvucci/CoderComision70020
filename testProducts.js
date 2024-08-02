
import productManage from "./src/managers/productManage.js";

console.log("Comienza Proceso");

await productManage.addProduct({
  title: "Producto 1",
  description: "Descripción del producto 1",
  price: 100,
  thumbnail: "",
  code: "ABC124",
  stock: 110,
});

// productManage.addProduct({
//   title: "Producto 2",
//   description: "Descripción del producto 2",
//   price: 200,
//   thumbnail: "",
//   code: "ABC124",
//   stock: 10,
// })

productManage.getProducts();