import * as dotenv from "dotenv";
import { createHash } from "../utils.js";
import { usersService } from "../repository/index.js";
import { generateToken } from "../utils.js";

//Inicializa servicios
dotenv.config();

//Variables
const JWT_SECRET = process.env.JWT_SECRET;

//Ruta que realiza el registro
async function signupUser(req, res) {
  res.status(200).json({ message: "Usuario creado con éxito" });
}

//Ruta que se ejecuta cuando falla el registro
async function failRegister(req, res) {
  res.status(500).json({ error: "Error al crear el ususario" });
}

//Ruta que realiza el login
async function loginUser(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({
      message: "error",
      data: "Faltan campos",
    });
  }

  // Establecer la política de cookies en la respuesta
  res.setHeader("Access-Control-Allow-Credentials", true);

  const result = await usersService.getOneUser(username);

  console.log(result);
  const myToken = generateToken({ username, password, role: result[0].role });
  console.log(myToken);
  res
    .cookie("token", myToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60,
    })
    .json({ message: "Login correcto" });
}

//Ruta que se ejecuta cuando falla el registro
async function failLogin(req, res) {
  res.status(500).json({ error: "Error al iniciar session" });
}

//Ruta que recupera la contraseña
async function forgotPassword(req, res) {
  const { username, newPassword } = req.body;

  const result = await usersService.getOneUser(username);
  if (result.length === 0)
    return res.status(401).json({
      respuesta: "El usuario no existe",
    });
  else {
    const updatePassword = await usersService.updateUserPassword(
      result[0]._id,
      createHash(newPassword)
    );
    res.status(200).json({
      respuesta: "Contrseña actualizada con éxito",
    });
  }
}

//Callback de github
async function githubCallback(req, res) {
  req.user = req.user._json;
  res.redirect("/api/products?page=1");
}

export {
  signupUser,
  failRegister,
  loginUser,
  failLogin,
  forgotPassword,
  githubCallback,
};
