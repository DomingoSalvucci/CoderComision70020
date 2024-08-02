import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "products"; // nombre de la coleccion

//Modelo de Schema
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true  // Dato requerido
  },
  description: {
    type: String
  },
  code: {
    type: String,
    unique: true  // Dato unico
  },
  stock: {
    type: Number
  },
  status: {
    type: Boolean,
    default: true
  },
  category: {
    type: String
  },
  price: {
    type: Number,
    default: 0  // valor por defecto
  },
  thumbnail: {
    type: Array,
    default: []
  }

});

productSchema.plugin(mongoosePaginate);


// exportamos el modelo que vamos a utilizar
export const productModel = mongoose.model(productCollection,productSchema);

