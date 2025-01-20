import {
  postRegistrarCliente,
  getClientes,
  updateCliente,
  getSelectData,
  buscarClientePorCorreo,
} from "../repository/index.repository.js";
import mongoose from "mongoose";

export const register = async (req, res) => {
  const session = req.session;
  const cliente = req.body;
  try {
    const nuevoCliente = await postRegistrarCliente(cliente, session);
    await session.commitTransaction();
    session.endSession();
    if (nuevoCliente) {
      res.status(200).json({ desc: "Cliente Registrado Correctamente" });
    } else {
      res
        .status(500)
        .json({ desc: "Error al registrar al cliente. Inténtalo más tarde" });
    }
  } catch (error) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    res.status(500).json({ desc: "Error interno en el servidor" });
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

export const actualizarCliente = async (req, res) => {
  const clientId = req.params.id;
  const cliente = req.body;
  const session = req.session;
  try {
    console.log("Cliente antes de llegar al repositorio", cliente);
    const result = await updateCliente(cliente, clientId, session);
    await session.commitTransaction();
    session.endSession();
    if (!result) {
      return res.status(400).json({
        desc: "Ocurrio un error al actualizar el cliente",
      });
    }
    return res.status(200).json({ desc: "Cliente actualizado con exito" });
  } catch (error) {
    console.log(error)
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
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
