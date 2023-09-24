import passport from "passport";
import * as dotenv from "dotenv";
import local from "passport-local";
import GitHubStrategy from "passport-github2";
import { usersService } from "../repository/index.js";
import { createHash, isValidPassword } from "../utils.js";

// Inicializar servicios
dotenv.config();
const LocalStrategy = local.Strategy;

const ADMIN_ID = process.env.ADMIN_ID;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const initializePassport = () => {
  // Configurar passport para registrar usuarios
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { first_name, last_name, email } = req.body;
        let role;
        if (username !== ADMIN_ID || password !== ADMIN_PASSWORD) {
          role = "user";
        } else {
          role = "admin";
        }
        try {
          const user = await usersService.getOne(username);
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
            let result = await usersService.signup(newUser);
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
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "username",
        passwordField: "password",
      },
      async (req, username, password, done) => {
        try {
          const user = await usersService.getOne(username);
          if (user.length === 0) {
            return done(null, false, {
              message: "El usuario no existe",
            });
          }
          if (!isValidPassword(user[0].password, password)) {
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

  // Serializar y deserializar usuarios
  passport.serializeUser((user, done) => {
    done(null, user[0].email);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await usersService.getOne(id);
    done(null, user);
  });
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
          const user = await usersService.getOne(profile?.emails[0]?.value);
          if (user.length === 1) {
            return done(null, user);
          } else {
            const newUser = {
              first_name: profile.displayName.split(" ")[0],
              last_name: profile.displayName.split(" ")[1],
              email: profile?.emails[0]?.value,
              age: 18,
              password: "123",
            };
            const userNew = await usersService.signup(newUser);
            return done(null, userNew);
          }
        } catch (error) {
          return done("Error al crear el usuario", error);
        }
      }
    )
  );

  // Serializar y deserializar usuarios
  passport.serializeUser((user, done) => {
    done(null, user.email);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await usersService.getOne(id);
    done(null, user);
  });
};

export { initializePassport, githubStrategy };
