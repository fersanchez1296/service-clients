import mongoose from "mongoose";
import * as Models from "../models/index.js";

export const nuevaInformacion = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  req.session = session;
  const nuevaDependencia = req.body.nuevaDependencia;
  const nuevaSecretaria = req.body.nuevaSecretaria;
  const nuevaDArea = req.body.nuevaDArea;
  const nuevaDGeneral = req.body.nuevaDGeneral;

  try {
    if (nuevaDependencia) {
      console.log("Agregando nuevaDependencia:", nuevaDependencia);
      const nuevoDependencia = await Models.dependenciaModel.create(
        [{ Dependencia: nuevaDependencia }],
        { session }
      );
      req.body.Dependencia = nuevoDependencia[0]._id;
    }

    if (nuevaSecretaria) {
      console.log("Agregando nueva secretaria:", nuevaSecretaria);
      const nuevoSecretaria = await Models.secretariaModel.create(
        [{ Secretaria: nuevaSecretaria }],
        { session }
      );
      req.body.Secretaria = nuevoSecretaria[0]._id;
    }

    if (nuevaDArea) {
      console.log("Agregando nuevaDArea:", nuevaDArea);
      const nuevoDArea = await Models.direccion_areaModel.create(
        [{ direccion_area: nuevaDArea }],
        { session }
      );
      req.body.direccion_area = nuevoDArea[0]._id;
    }

    if (nuevaDGeneral) {
      console.log("Agregando nuevaDGeneral:", nuevaDGeneral);
      const nuevoDGeneral = await Models.direccion_generalModel.create(
        [{ Direccion_General: nuevaDGeneral }],
        { session }
      );
      req.body.Direccion_General = nuevoDGeneral[0]._id;
    }
    next();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ desc: "Error al procesar la información nueva" });
  }
};
