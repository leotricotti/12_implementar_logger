import { Router } from "express";
import {
  getProducts,
  saveProduct,
} from "../controllers/realTimeProducts.controller.js";

//Inicializar servicios
const router = Router();

// Método asyncrono para obtener los productos en tiempo real
router.get("/", getProducts);

//Metodo asyncrono para guardar un producto
router.post("/", saveProduct);

export default router;
