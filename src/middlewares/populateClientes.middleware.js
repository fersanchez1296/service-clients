import * as Models from "../models/index.js";
export const populateClientes = async (req, res) => {
  try {
    const POPULATE = await Models.clientesModel.populate(req.clientesFormateados, [
      { path: "Dependencia", select: "Dependencia _id" },
      { path: "direccion_area", select: "direccion_area _id" },
      { path: "Direccion_General", select: "Direccion_General _id" },
    ]);
    if (!POPULATE) {
      return res.status(500).json({ desc: "Error al procesar los clientes." });
    }
    return res.status(200).json(POPULATE);
  } catch (error) {
    return res.status(500).json({ desc: "Error al formatear los clientes." });
  }
};
