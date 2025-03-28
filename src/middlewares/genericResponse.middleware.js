export const genericResponse = async (req, res) => {
  if (req.idCliente) {
    return res.status(200).json({
      desc: "Cliente creado con exito.",
      data: req.idCliente,
    });
  }

  return res.status(200).json({
    desc: "Operación exitosa.",
  });
};
