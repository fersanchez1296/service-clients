import * as Models from "../models/index.js";

export const verifyClientExists = async (req, res, next) => {
  if (!req.body.Correo) {
    return res
      .status(400)
      .json({ desc: "No se proporciono un parametro de busqueda" });
  }
  const { Correo } = req.body;
  try {
    const result = await Models.clientesModel.find({
      Correo,
    });
    if (result.length === 0) {
      next();
    } else {
      return res.status(409).json({ desc: "El cliente ya existe" });
    }
  } catch (error) {
    console.log(error);
  }
};
