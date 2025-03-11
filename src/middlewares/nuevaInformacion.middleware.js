import mongoose from "mongoose";
import Dependencia from "../models/dependencia.model.js";
import Direccion_area from "../models/direccion_area.model.js";
import Direccion_general from "../models/direccion_general.model.js";

export const nuevaInformacion = async (req, res, next) => {
  const session = req.mongoSession;
  try {
    if (
      !req.body.nuevaDependencia &&
      !req.body.nuevaDArea &&
      !req.body.nuevaDGeneral
    ) {
      return next();
    }

    const nuevaDependencia = req.body.nuevaDependencia || null;
    const nuevaDArea = req.body.nuevaDArea || null;
    const nuevaDGeneral = req.body.nuevaDGeneral || null;

    if (nuevaDependencia) {
      const nuevoDependencia = new Dependencia({
        Dependencia: nuevaDependencia,
      });
      const result = await nuevoDependencia.save({ session });
      if (!result) {
        await session.abortTransaction();
        session.endSession();
        return res
          .status(500)
          .json({ desc: "Error al guardar la nueva dependencia" });
      }
      req.body.Dependencia = nuevoDependencia._id;
    }

    if (nuevaDArea) {
      const nuevoDArea = new Direccion_area({ direccion_area: nuevaDArea });
      const result = await nuevoDArea.save({ session });
      if (!result) {
        await session.abortTransaction();
        session.endSession();
        return res
          .status(500)
          .json({ desc: "Error al aguardar la nueva dirección de área" });
      }
      req.body.direccion_area = nuevoDArea._id;
    }

    if (nuevaDGeneral) {
      const nuevoDGeneral = new Direccion_general({
        Direccion_General: nuevaDGeneral,
      });
      const result = await nuevoDGeneral.save({ session });
      if (!result) {
        await session.abortTransaction();
        session.endSession();
        return res
          .status(500)
          .json({ desc: "Error al a=guardar la nueva dirección general" });
      }
      req.body.Direccion_General = nuevoDGeneral._id;
    }
    return next();
  } catch (error) {
    console.log("Error al guardar cliente");
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ desc: "Error al guardar el cliente" });
  }
};
