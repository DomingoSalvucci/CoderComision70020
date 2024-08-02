export const checkProductData = async (req, res, next) => {
  try {

    const { title, description, code, stock, status, category, price, thumbnail } = req.body;
    const newProduct = { title, description, code, stock, status, category, price, thumbnail };

    // verificar que el producto tenga todas las propiedades
    if (Object.values(newProduct).includes(undefined)){
      return res.status(400).json({status:"error", msg:"Todos los campos son obligatorios"});
    }
    // next() me permite que continue la ejecución del endpoint.
    next();

  } catch (error) {
    res.status(500).json({status:"error", msg: "Error interno del servidor Midleware"});
  }
};

