import express from "express"
import __dirname from "./dirname.js";
// import productRouter from "./router/product.router.js"
// import cartRouter    from "./router/cart.router.js"
import {connectMongoDB} from "./config/mongoDb.config.js"
import envs from "./config/envs.config.js"
import router from "./router/index.router.js"
const app = express();
// conexion con Mongo
connectMongoDB();

app.use(express.json());  // Este middleware nos permite obtener archivos json 
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.use("/api", router);



app.listen(envs.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${envs.PORT}`);
});


