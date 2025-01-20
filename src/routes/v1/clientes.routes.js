import { Router } from "express";
import {
  obtenerClientes,
  register,
  actualizarCliente,
  obtenerSelectData,
  obtenerCliente,
} from "../../controllers/clientes.controller.js";
import { validateData } from "../../middlewares/validate_data.middleware.js";
import { verifyToken } from "../../middlewares/verify_token.middleware.js";
import { verifyRole } from "../../middlewares/verify_role.middleware.js";
import { verifyClientExists } from "../../middlewares/verifyClientExists.middleware.js";
import { populateClientes } from "../../middlewares/populateClientes.middleware.js";
import { nuevaInformacion } from "../../middlewares/nuevaInformacion.middleware.js";
const router = Router();

router.post(
  "/clients",
  verifyToken,
  verifyRole("Root"),
  verifyClientExists,
  nuevaInformacion,
  validateData("clientes"),
  register
);
router.get(
  "/clients",
  verifyToken,
  verifyRole("Root"),
  obtenerClientes,
  populateClientes
);
router.get(
  "/clients/selectData",
  verifyToken,
  verifyRole("Root"),
  obtenerSelectData,
);
router.put(
  "/clients/:id",
  verifyToken,
  verifyRole("Root"),
  validateData("clientes"),
  actualizarCliente,
);

router.get(
  "/clients/:correo",
  verifyToken,
  verifyRole("Root"),
  obtenerCliente,
  populateClientes
);

export default router;
