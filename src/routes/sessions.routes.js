import passport, { authenticate } from "passport";
import { Router } from "express";
import {
  signupUser,
  failRegister,
  failLogin,
  loginUser,
  forgotPassword,
  githubCallback,
  handleLogout,
  currentUser,
} from "../controllers/sessions.controller.js";
import { authenticate } from "passport";

//Inicializa servicios
const router = Router();

//Ruta que realiza el registro
router.post(
  "/signup",
  passport.authenticate("register", {
    failureRedirect: "/api/sessions/failRegister",
  }),
  signupUser
);

//Ruta que se ejecuta cuando falla el registro
router.get("/failRegister", failRegister);

//Ruta que realiza el login
router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/failLogin",
  }),
  loginUser
);

//Ruta que se ejecuta cuando falla el login
router.get("/failLogin", failLogin);

//Ruta que recupera la contraseña
router.post("/forgot", forgotPassword);

//Ruta que cierra la sesión
router.get("/logout", handleLogout);

//Ruta que contiene el usuario logueado
router.get("/current", authenticate, currentUser);

//Ruta que realiza el login con github
router.get(
  "/github",
  passport.authenticate(
    "github",
    { scope: ["user:email"] },
    async (req, res) => {}
  )
);

//Callback de github
router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  githubCallback
);

export default router;
