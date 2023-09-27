import passport from "passport";
import { Router } from "express";
import {
  signupUser,
  failRegister,
  failLogin,
  loginUser,
  forgotPassword,
  githubCallback,
} from "../controllers/sessions.controller.js";

//Inicializa servicios
const router = Router();

//Ruta que realiza el registro
router.post(
  "/signup",
  passport.authenticate("register", {
    passReqToCallback: true,
    session: false,
    failureRedirect: "api/sessions/failedRegister",
    failureMessage: true,
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

//Ruta que devuelve el usuario logueado
router.get("/current", passport.authenticate, (req, res) => {
  getUserInfo();
});

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
