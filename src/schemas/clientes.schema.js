import Joi from "joi";
export const clientesSchema = Joi.object({
  Nombre: Joi.string().required(),
  Correo: Joi.string().email().required(),
  Direccion_General: Joi.string().length(24).hex().allow(""),
  direccion_area: Joi.string().length(24).hex().required(),
  Dependencia: Joi.string().length(24).hex().required(),
  Telefono: Joi.number().required(),
  Extension: Joi.number().required(),
  Ubicacion: Joi.string().required(),
  nuevaDependencia: Joi.string().allow(''),
  nuevaDArea: Joi.string().allow(''),
  nuevaDGeneral: Joi.string().allow(''),
});

