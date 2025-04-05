import * as Models from "../models/index.js";

export const verifyClientExists = async (req, res, next) => {
  if (!req.body.Correo) {
    return res
      .status(400)
      .json({ desc: "No se proporciono un parametro de busqueda" });
  }
  const { Correo, Nombre } = req.body;
  console.log(Correo, Nombre);
  try {
    const result = await Models.clientesModel.findOne({
      $or: [{ Correo }, { Nombre }],
    });
    if (!result) {
      return next();
    } else {
      return res
        .status(409)
        .json({ desc: "El cliente con este nombre o este correo ya existe" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ desc  : "Error interno en el servidor. Intente mas tarde" });
  }
};
