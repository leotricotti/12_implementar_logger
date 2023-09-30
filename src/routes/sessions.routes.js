import passport from "passport";
import { Router } from "express";
import {
  signupUser,
  failRegister,
  failLogin,
  loginUser,
  forgotPassword,
  githubCallback,
  currentUser,
} from "../controllers/sessions.controller.js";

//Inicializa servicios
const router = Router();

//Ruta que realiza el registro
router.post(
  "/signup",
  passport.authenticate("register", {
    session: false,
    passReqToCallback: true,
    failureMessage: true,
    failureRedirect: "api/sessions/failedRegister",
  }),
  signupUser
);

//Ruta que se ejecuta cuando falla el registro
router.get("/failRegister", failRegister);

//Ruta que realiza el login
router.post("/login", loginUser);

//Ruta que recupera la contraseña
router.post("/forgot", forgotPassword);

//Ruta que se ejecuta cuando falla el login
router.get("/failLogin", failLogin);

// Ruta que envia el usuario logueado
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  currentUser
);

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
  passport.authenticate("github", {
    failureRedirect: "/login",
    session: false,
    passReqToCallback: true,
    failureMessage: true,
  }),
  githubCallback
);

export default router;
