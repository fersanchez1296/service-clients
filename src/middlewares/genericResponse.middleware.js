export const genericResponse = async (req, res) => {
    res
      .status(200)
      .json({
        desc: "Operación exitosa.",
      });
  };
  