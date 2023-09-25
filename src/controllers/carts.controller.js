import { cartService } from "../repository/index.js";

//Método asyncrono para obtener todos los carritos
async function getAll(req, res) {
  try {
    const carts = await cartService.getAllCarts();
    res.json({ carts });
  } catch (err) {
    res.status(500).json({
      message: "Error al obtener los carritos",
      data: err,
    });
  }
}

//Método asyncrono para obtener un carrito
async function getOne(req, res) {
  const { cid } = req.params;
  try {
    const cart = await cartService.getOneCart(cid);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({
        message: "Carrito no encontrado",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error al obtener el carrito",
      data: err,
    });
  }
}

//Método asyncrono para popular el carrito
async function populatedCart(req, res) {
  const { cid } = req.params;
  try {
    const cart = await cartService.populatedOneCart(cid);
    const user = req.session.user[0]?.first_name ?? req.session.user.first_name;
    const product = cart.products;
    if (cart) {
      res.render("Carts", {
        Carts: product,
        styles: "Carts.styles.css",
        user: user,
      });
    } else {
      res.status(404).json({
        message: "Carrito no encontrado",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error al obtener el carrito",
      data: err,
    });
  }
}

//Método asyncrono para crear un carrito
async function createCart(req, res) {
  try {
    const newCart = req.body;
    const result = await cartService.saveOneCart(newCart);
    res.json({ message: "Carrito creado con éxito", data: newCart });
  } catch (err) {
    res.status(500).json({ message: "Error al crear el carrito ", data: err });
  }
}

//Método asyncrono para agregar productos al carrito
async function addProduct(req, res) {
  const { cid, pid } = req.params;
  const { op } = req.body;
  try {
    const cart = await cartService.getOneCart(cid);
    let productExistsInCart = cart.products.findIndex(
      (dato) => dato.product == pid
    );
    productExistsInCart == -1
      ? cart.products.push({
          product: pid,
          quantity: 1,
        })
      : (cart.products[productExistsInCarts].quantity =
          op === "add"
            ? cart.products[productExistsInCarts].quantity + 1
            : cart.products[productExistsInCarts].quantity - 1);

    const result = await cartService.updateCarts(cid, cart);

    const updatedCart = await cartService.getOne(cid);

    res.json({ message: "Carrito actualizado con éxito", data: updatedCart });
  } catch (err) {
    res.status(500).json({
      message: "Error al actualizar el carrito",
      data: err,
    });
  }
}

//Método asyncrono para eliminar productos del carrito
async function deleteProduct(req, res) {
  const { cid, pid } = req.params;
  try {
    const cart = await CartService.getOne(cid);
    let productExistsInCarts = cart.products.findIndex(
      (dato) => dato.product == pid
    );
    productExistsInCarts == -1
      ? res.status(404).json({ message: "Producto no encontrado" })
      : cart.products.splice(productExistsInCarts, 1);
    const result = await cart.updateCarts(cid, cart);
    res.json({ message: "Producto eliminado con éxito", data: cart });
  } catch (err) {
    res.status(500).json({
      message: "Error al eliminar el producto del carrito",
      data: err,
    });
  }
}

//Método asyncrono para vaciar el carrito
async function emptyCart(req, res) {
  const { cid } = req.params;
  try {
    const cart = await CartService.getOne(cid);
    if (cart) {
      cart.products = [];
      const result = await cart.updateCarts(cid, cart);
      res.json({ message: "Carrito vaciado con éxito", data: cart });
    } else {
      res.status(404).json({
        message: "Carrito no encontrado",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error al vaciar el carrito",
      data: err,
    });
  }
}

export {
  getAll,
  getOne,
  createCart,
  addProduct,
  deleteProduct,
  emptyCart,
  populatedCart,
};
