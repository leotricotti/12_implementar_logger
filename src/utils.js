import bcrypt from "bcrypt";
import * as dotenv from "dotenv";

//Variables
dotenv.config();

//Encriptar contraseña
export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (savedPassword, password) => {
  return bcrypt.compareSync(password, savedPassword);
};

// Generar token
// Esta función recibe un objeto de usuario y genera un token JWT utilizando la clave privada definida en la constante PRIVATE_KEY.
// El token generado tiene una duración de 1 hora y se devuelve como resultado de la función.
const generateToken = (user) => {
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "1h" });
  return token;
};

// Verificar token
// Esta función es un middleware que se utiliza para verificar si un token JWT es válido.
// La función verifica si el token se encuentra en el encabezado de autorización de la solicitud y lo decodifica utilizando la clave privada definida en la constante PRIVATE_KEY.
// Si el token es válido, el objeto de usuario decodificado se agrega a la solicitud y se llama a la siguiente función de middleware.
// Si el token no es válido, se devuelve una respuesta de error con un código de estado 403.
const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) res.status(401).json({ error: "Error de autenticacion" });

  const token = authHeader.split(" ")[1];
  console.log(token);
  jwt.verify(token, PRIVATE_KEY, (err, user) => {
    if (err) res.status(403).json({ error: "Token invalido" });

    req.user = user;
    next();
  });
};

// Passport
// Esta función es un middleware que se utiliza para autenticar a los usuarios utilizando Passport.js.
// La función recibe una estrategia de autenticación como parámetro y devuelve un middleware que se utiliza para autenticar a los usuarios en una solicitud.
// Si la autenticación es exitosa, el objeto de usuario se agrega a la solicitud y se llama a la siguiente función de middleware.
// Si la autenticación falla, se devuelve una respuesta de error con un código de estado 401.
const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (error, user, info) {
      if (error) return next(error);
      if (!user)
        return res.status(401).json({
          error: info.messages ? info.messages : info.toString(),
        });
      user.role = "admin";
      req.user = user;
      next();
    })(req, res, next);
  };
};

//Función que verifica si un usuario tiene permisos para acceder a una ruta determinada
const authorization = (role) => {
  return async (req, res, next) => {
    console.log(req.user);
    if (!req.user) return res.status(401).send({ error: "Unauthorized" });
    if (req.user.role != role)
      return res.status(403).send({ error: "No permissions" });
    next();
  };
};
export { generateToken, authToken, passportCall, authorization };
