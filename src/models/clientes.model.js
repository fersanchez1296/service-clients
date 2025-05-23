import mongoose, { Schema } from "mongoose";

const clientesModel = mongoose.Schema(
  {
    Nombre: {
      type: String,
      trim: true,
      required: true,
    },
    Correo: {
      type: String,
      trim: true,
      required: true,
    },
    Dependencia: {
      type: Schema.Types.ObjectId,
      ref: "Dependencia",
      trim: true,
      default: new mongoose.Types.ObjectId("679b8a12c9c34d1de358f1cd"), //esto no tiene porque estar quemado
    },
    Direccion_General: {
      type: Schema.Types.ObjectId,
      ref: "Direccion_general",
      trim: true,
    },
    direccion_area: {
      type: Schema.Types.ObjectId,
      ref: "Direccion_area",
      trim: true,
      required: true,
    },
    Telefono: {
      type: String,
      trim: true,
      required: true,
    },
    Extension: {
      type: String,
      trim: true,
    },
    Ubicacion: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timesStampes: true,
  }
);

export default mongoose.model("Clientes", clientesModel, "Clientes");
