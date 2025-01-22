import mongoose from "mongoose";
import Dependencia from "../models/dependencia.model.js"
import Direccion_area from "../models/direccion_area.model.js"
import Direccion_general from "../models/direccion_general.model.js"
import * as Models from "../models/index.js";

export const nuevaInformacion = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  req.session = session;
  const nuevaDependencia = req.body.nuevaDependencia;
  const nuevaDArea = req.body.nuevaDArea;
  const nuevaDGeneral = req.body.nuevaDGeneral;

  try {
    if (nuevaDependencia) {
      console.log("Agregando nuevaDependencia:", nuevaDependencia);
      const nuevoDependencia = await Dependencia.create(
        [{ Dependencia: nuevaDependencia }],
        { session }
      );
      console.log("idDependencia",nuevoDependencia)
      req.body.Dependencia = nuevoDependencia[0]._id;
    }

    if (nuevaDArea) {
      console.log("Agregando nuevaDArea:", nuevaDArea);
      const nuevoDArea = await Direccion_area.create(
        [{ direccion_area: nuevaDArea }],
        { session }
      );
      req.body.direccion_area = nuevoDArea[0]._id;
    }

    if (nuevaDGeneral) {
      console.log("Agregando nuevaDGeneral:", nuevaDGeneral);
      const nuevoDGeneral = await Direccion_general.create(
        [{ Direccion_General: nuevaDGeneral }],
        { session }
      );
      req.body.Direccion_General = nuevoDGeneral[0]._id;
    }
    next();
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ desc: "Error al procesar la información nueva" });
  }
};
