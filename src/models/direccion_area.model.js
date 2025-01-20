import mongoose from "mongoose";

const direccionAreaModel = mongoose.Schema(
    {
      direccion_area: {
        type: String,
        trim: true,
        required: true,
      },
    },
    {
      timesStampes: true,
    }
  );
  
  export default mongoose.model("Direccion_area", direccionAreaModel, "Direccion_area");