import mongoose from "mongoose";

const cartCollection = "carts"; // nombre de la coleccion

//Modelo de Schema
const cartSchema = new mongoose.Schema(
  {products:{
    type: [{product: {type: mongoose.Schema.Types.ObjectId, ref: "products"}, quantity: Number}],
    default: []
  }
});

cartSchema.pre("find", function () {
  this.populate("products.product");
});


// exportamos el modelo que vamos a utilizar
export const cartModel = mongoose.model(cartCollection,cartSchema);

