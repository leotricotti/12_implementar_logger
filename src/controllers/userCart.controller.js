import { usersService } from "../repository/index.js";

//Ruta que agrega el id del carrito al usuario
async function addCartIDToUser(req, res) {
  const { cartId, user } = req.body;
  const email = user.name;
  try {
    const user = await usersService.getOne(email);
    const userId = user[0]._id;
    const cartExist = user[0].carts.find((cart) => cart == cartId);
    if (!cartExist) {
      user[0].carts.push(cartId);
      const respuesta = await usersService.updateCart(userId, user[0]);
    } else {
      return false;
    }
  } catch (err) {
    res.status(500).json({
      message: "Error al agregar el carrito",
      data: err,
    });
  }
}

export default addCartIDToUser;
