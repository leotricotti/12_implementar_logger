import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import passport from "passport";
import * as dotenv from "dotenv";
import __dirname from "./utils.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import UserCart from "./routes/userCart.routes.js";
import CartsRouter from "./routes/carts.routes.js";
import SessionsRouter from "./routes/sessions.routes.js";
import ProductsRouter from "./routes/products.routes.js";
import RealTimeProducts from "./routes/realTimeProducts.routes.js";
import {
  initializePassport,
  githubStrategy,
} from "./config/passport.config.js";
import { authenticate } from "./middleware/auth.middleware.js";

// Inicializar servicios
dotenv.config();

//Variables
const app = express();
const PORT = process.env.PORT || 3002;
const MONGO_URI = process.env.MONGO_URI;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 30 * 60,
    }),
    secret: "codersecret",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport
githubStrategy();
initializePassport();
app.use(passport.initialize());

//Función asincrónica para conectar a la base de datos  y chequear si está conectada
async function enviroment() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Base de datos conectada");
  } catch (error) {
    console.log(error);
  }
}

enviroment();

// Routes
app.use("/api/userCart", authenticate, UserCart);
app.use("/api/carts", authenticate, CartsRouter);
app.use("/api/sessions", SessionsRouter);
app.use("/api/products", authenticate, ProductsRouter);
app.use("/api/realtimeproducts", authenticate, RealTimeProducts);

// Server
const httpServer = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
