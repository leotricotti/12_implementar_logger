import { Router } from "express";
import {
  getProducts,
  saveProduct,
  deleteProduct,
} from "../controllers/realTimeProducts.controller.js";

//Inicializar servicios
const router = Router();

// Ruta que obtine todos los productos
router.get("/", getProducts);

//Ruta para guardar un producto
router.post("/", saveProduct);

//Ruta para eliminar un producto
router.delete("/:id", deleteProduct);

export default router;
