import * as Models from "../models/clientes.model.js";
import Clientes from "../models/clientes.model.js";
import Dependencias from "../models/dependencia.model.js";
import Direccion_general from "../models/direccion_general.model.js";
import Direccion_area from "../models/direccion_area.model.js";
export const postRegistrarCliente = async (cliente, session) => {
  try {
    const newCliente = new Clientes({
      ...cliente,
    });
    const result = await newCliente.save({ session });
    if (!result) {
      return false;
    }
    return result;
  } catch (error) {
    return false;
  }
};

export const getClientes = async () => {
  try {
    const RES = await Clientes.find().lean();
    if (!RES) {
      return false;
    }
    return RES;
  } catch (error) {
    return false;
  }
};

export const updateCliente = async (cliente, clienteId, session) => {
  try {
    const RES = await Clientes.findOneAndUpdate(
      { _id: clienteId },
      { $set: { ...cliente } },
      { session }
    );
    if (RES.modifiedCount === 0) {
      return false;
    }
    return RES;
  } catch (error) {
    return false;
  }
};

export const getSelectData = async () => {
  try {
    const [dependencias, dareas, dgenerales] = await Promise.all([
      Dependencias.find(),
      Direccion_area.find(),
      Direccion_general.find(),
    ]);
    if (!dependencias || !dareas || !dgenerales) {
      return false;
    }
    return {
      dependencias,
      dareas,
      dgenerales,
    };
  } catch (error) {
    return false;
  }
};

export const buscarClientePorCorreo = async (correo, session) => {
  try {
    const result = await Clientes.findOne({ Correo: correo });
    if (!result) {
      return false;
    }
    return result;
  } catch (error) {
    return false;
  }
};
