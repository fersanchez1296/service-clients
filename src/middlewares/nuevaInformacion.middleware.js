import Dependencia from "../models/dependencia.model.js";
import Direccion_area from "../models/direccion_area.model.js";
import Direccion_general from "../models/direccion_general.model.js";
import {
  verifyDireccionGeneralExists,
  verifyDireccionAreaExists,
} from "../repository/index.repository.js";
export const nuevaInformacion = async (req, res, next) => {
  const session = req.mongoSession;
  try {
    if (!req.body.nuevaDArea && !req.body.nuevaDGeneral) {
      return next();
    }

    const nuevaDArea = req.body.nuevaDArea || null;
    const nuevaDGeneral = req.body.nuevaDGeneral || null;

    if (nuevaDArea) {
      const exist = await verifyDireccionAreaExists(nuevaDArea);
      console.log(nuevaDArea)
      console.log(exist)
      if (!exist) {
        const nuevoDArea = new Direccion_area({ direccion_area: nuevaDArea });
        const result = await nuevoDArea.save({ session });
        if (!result) {
          await session.abortTransaction();
          session.endSession();
          return res
            .status(500)
            .json({ desc: "Error al guardar la nueva dirección de área" });
        }
        req.body.direccion_area = nuevoDArea._id;
      } else {
        await session.abortTransaction();
        session.endSession();
        return res
          .status(409)
          .json({ desc: "Esta dirección de área ya existe." });
      }
    }

    if (nuevaDGeneral) {
      const exist = await verifyDireccionGeneralExists(nuevaDGeneral);
      console.log(nuevaDGeneral)
      console.log(exist)
      if (!exist) {
        const nuevoDGeneral = new Direccion_general({
          Direccion_General: nuevaDGeneral,
        });
        const result = await nuevoDGeneral.save({ session });
        if (!result) {
          await session.abortTransaction();
          session.endSession();
          return res
            .status(500)
            .json({ desc: "Error al guardar la nueva dirección general" });
        }
        req.body.Direccion_General = nuevoDGeneral._id;
      } else {
        await session.abortTransaction();
        session.endSession();
        return res
          .status(409)
          .json({ desc: "Esta dirección general ya existe." });
      }
    }
    return next();
  } catch (error) {
    console.log("Error al guardar cliente");
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ desc: "Error al guardar el cliente" });
  }
};
