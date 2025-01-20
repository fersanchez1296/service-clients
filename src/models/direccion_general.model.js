import mongoose from "mongoose";

const direccionGeneralModel = mongoose.Schema(
    {
      Direccion_General: {
        type: String,
        trim: true,
        required: true,
      },
    },
    {
      timesStampes: true,
    }
  );
  
  export default mongoose.model("Direccion_general", direccionGeneralModel, "Direccion_general");