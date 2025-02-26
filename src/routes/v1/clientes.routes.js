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
import { startTransaction } from "../../middlewares/startTransaction.middleware.js";
import { endTransaction } from "../../middlewares/endTransaction.middleware.js";
import { genericResponse } from "../../middlewares/genericResponse.middleware.js";
const router = Router();

router.post(
  "/clients",
  verifyToken,
  verifyRole(["Root", "Administrador"]),
  verifyClientExists,
  startTransaction,
  nuevaInformacion,
  register,
  endTransaction,
  genericResponse
);
router.get(
  "/clients",
  verifyToken,
  verifyRole(["Root", "Administrador"]),
  obtenerClientes,
  populateClientes
);
router.get(
  "/clients/selectData",
  verifyToken,
  verifyRole(["Root", "Administrador"]),
  obtenerSelectData
);
router.put(
  "/clients/:id",
  verifyToken,
  verifyRole(["Root", "Administrador"]),
  startTransaction,
  nuevaInformacion,
  actualizarCliente,
  endTransaction,
  genericResponse
);

router.get(
  "/clients/:correo",
  verifyToken,
  verifyRole(["Root", "Administrador"]),
  obtenerCliente,
  populateClientes
);

export default router;
