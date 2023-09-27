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
