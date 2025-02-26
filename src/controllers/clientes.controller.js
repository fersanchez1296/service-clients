import {
  postRegistrarCliente,
  getClientes,
  updateCliente,
  getSelectData,
  buscarClientePorCorreo,
} from "../repository/index.repository.js";

export const register = async (req, res, next) => {
  const session = req.mongoSession;
  try {
    const cliente = req.body;
    const nuevoCliente = await postRegistrarCliente(cliente, session);
    if (!nuevoCliente) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(500)
        .json({ desc: "Ocurrió un error al registrar el clinte" });
    }
    return next();
  } catch (error) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    return res.status(500).json({ desc: "Error interno en el servidor" });
  }
};

export const obtenerClientes = async (req, res, next) => {
  try {
    const clientes = await getClientes();
    if (!clientes) {
      return res.status(404).json({ desc: "No se encontraron clientes" });
    }
    req.clientesFormateados = clientes;
    next();
  } catch (error) {
    return res.status(500).json({ desc: "Error interno en el servidor" });
  }
};

export const actualizarCliente = async (req, res, next) => {
  const session = req.mongoSession;
  try {
    const clientId = req.params.id;
    const cliente = req.body;
    const result = await updateCliente(cliente, clientId, session);
    if (!result) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        desc: "Ocurrio un error al actualizar el cliente",
      });
    }
    return next();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({ desc: "Error interno en el servidor" });
  }
};

export const obtenerSelectData = async (req, res) => {
  try {
    const result = await getSelectData();
    if (!result) {
      return res
        .status(404)
        .json({ desc: "No se encontró informacion para los select." });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ desc: "Error interno en el servidor." });
  }
};

export const obtenerCliente = async (req, res, next) => {
  const correo = req.params.correo;
  try {
    const result = await buscarClientePorCorreo(correo);
    if (!result) {
      return res.status(404).json({ status: 404 });
    }
    req.clientesFormateados = result;
    next();
  } catch (error) {
    return res.status(500).json({ desc: "Error interno en el servidor" });
  }
};
