import passport from "passport";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

//Variables
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

//Encriptar contraseña
export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (savedPassword, password) => {
  return bcrypt.compareSync(password, savedPassword);
};

// Función que recibe un objeto de usuario y genera un token JWT.
const generateToken = (user) => {
  const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: "1h" });
  return token;
};

// Esta función para autenticar a los usuarios.
const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (error, user, info) {
      if (error) return next(error);
      if (!user)
        return res.status(401).json({
          error: info.messages ? info.messages : info.toString(),
        });
      req.user = user;
      next();
    })(req, res, next);
  };
};

//Función que verifica si un usuario tiene permisos para acceder a una ruta determinada
const authorization = (role) => {
  return async (req, res, next) => {
    if (!req.user) return res.status(401).send({ error: "Unauthorized" });
    if (req.user.role != role)
      return res.status(403).send({ error: "No permissions" });
    next();
  };
};

export { generateToken, passportCall, authorization };
