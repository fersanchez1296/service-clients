import * as Schemas from "../schemas/clientes.schema.js";

export const validateData = (schemaName) => {
  return (req, res, next) => {
    if (req.body.Direccion_General && typeof req.body.Direccion_General === 'object') {
      req.body.Direccion_General = req.body.Direccion_General.toString();
    }
    if (req.body.Secretaria && typeof req.body.Secretaria === 'object') {
      req.body.Secretaria = req.body.Secretaria.toString();
    }
    if (req.body.direccion_area && typeof req.body.direccion_area === 'object') {
      req.body.direccion_area = req.body.direccion_area.toString();
    }
    if (req.body.Dependencia && typeof req.body.Dependencia === 'object') {
      req.body.Dependencia = req.body.Dependencia.toString();
    }
    delete req.body.isEdit;
    delete req.body._id;
    delete req.body.id;
    delete req.body.secretarioNombre;
    const schema = Schemas[`${schemaName}Schema`];
    if (!schema) {
      return res.status(400).json({ error: "Nombre de Esquema inválido" });
    }
    const { error } = schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ error: error.details?.[0]?.message || "Error de validacion" });
    }
    next();
  };
};
