import CartsDao from "../dao/classes/carts.dao.js";
import CartsRepository from "./repositories/carts.repository.js";
import ProductsDao from "../dao/classes/products.dao.js";
import ProductsRepository from "./repositories/products.repository.js";
import UsersDao from "../dao/classes/users.dao.js";
import UsersRepository from "./repositories/users.repository.js";

export const cartService = new CartsRepository(new CartsDao());
export const productsService = new ProductsRepository(new ProductsDao());
export const usersService = new UsersRepository(new UsersDao());
