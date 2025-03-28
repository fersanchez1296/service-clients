import * as Schemas from "../schemas/clientes.schema.js";

export const validateData = (schemaName) => {
  return (req, res, next) => {
    if (req.body.Direccion_General && typeof req.body.Direccion_General === 'object') {
      req.body.Direccion_General = req.body.Direccion_General.toString();
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
    delete req.body.__v;
    delete req.body.Telext;
    delete req.body.direccionAreaNombre;
    delete req.body.dependenciaNombre;
    delete req.body.direccionGeneralNombre;
    const schema = Schemas[`${schemaName}Schema`];
    if (!schema) {
      return res.status(400).json({ desc: "Nombre de Esquema inválido" });
    }
    const { error } = schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ desc: "Error de validacion" });
    }
    next();
  };
};
