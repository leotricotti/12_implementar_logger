import passport from "passport";
import jwt from "passport-jwt";
import * as dotenv from "dotenv";
import GitHubStrategy from "passport-github2";
import { usersService } from "../repository/index.js";
import { createHash, isValidPassword } from "../utils.js";

// Inicializar servicios
dotenv.config();
const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const ADMIN_ID = process.env.ADMIN_ID;
const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const initializePassport = () => {
  // Configurar passport para registrar usuarios
  passport.use(
    "register",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: JWT_SECRET,
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, payload, done) => {
        const { first_name, last_name, email, password } = req.body;
        let role;
        if (payload.id === ADMIN_ID && payload.password === ADMIN_PASSWORD) {
          role = "admin";
        } else {
          role = "user";
        }
        try {
          const user = await usersService.getOneUser(email);
          if (user.length > 0) {
            return done(null, false, {
              message: "Error al crear el usuario. El usuario ya existe",
            });
          } else {
            const newUser = {
              first_name,
              last_name,
              email,
              password: createHash(password),
              role: role,
            };
            let result = await usersService.signupUser(newUser);
            return done(null, result);
          }
        } catch (error) {
          return done("Error al obtener el usuario", error);
        }
      }
    )
  );

  // Configurar passport para loguear usuarios
  passport.use(
    "login",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET,
        passReqToCallback: true,
        usernameField: "username",
        passwordField: "password",
      },
      async (req, payload, done) => {
        try {
          const user = await usersService.getOneUser(payload.email);
          if (user.length === 0) {
            return done(null, false, {
              message: "El usuario no existe",
            });
          }
          if (!isValidPassword(user[0].password, payload.password)) {
            return done(null, false, { message: "Contraseña incorrecta" });
          } else {
            return done(null, user);
          }
        } catch (error) {
          return done("Error al obtener el usuario", error);
        }
      }
    )
  );
};

// Configurar cookie extractor
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};

// Configurar passport para loguear usuarios con github
const githubStrategy = () => {
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await usersService.getOneUser(profile?.emails[0]?.value);
          if (user.length === 1) {
            return done(null, user);
          } else {
            const newUser = {
              first_name: profile.displayName.split(" ")[0],
              last_name: profile.displayName.split(" ")[1],
              email: profile?.emails[0]?.value,
              password: "123",
            };
            const userNew = await usersService.signupUser(newUser);
            return done(null, userNew);
          }
        } catch (error) {
          return done("Error al crear el usuario", error);
        }
      }
    )
  );
};

export { initializePassport, githubStrategy };
