import { ticketsService } from "../repository/index.js";
import { cartService } from "../repository/index.js";

async function finishPurchase(req, res) {
  const { username, totalPurchase, products } = req.body;
  const { cid } = req.params;

  try {
    const cart = await cartService.getOneCart(cid);

    const productWithOutStock = await products.filter((product) =>
      product.product.stock < product.quantity ? true : false
    );

    const missingProductDiscount = await productWithOutStock.reduce(
      (acc, product) => {
        return acc + product.product.price * product.quantity * 0.85;
      },
      0
    );

    const productWithStock = await products.filter((product) =>
      product.product.stock > product.quantity ? true : false
    );

    if (productWithOutStock.length === 0) {
      cart.products = [];
      const result = await cartService.updateOneCart(cid, cart);

      const newTicket = {
        code: Math.floor(Math.random() * 1000000),
        purchase_datetime: new Date().toLocaleString(),
        amount: totalPurchase,
        purchaser: username,
      };

      const ticket = await ticketsService.createOneTicket(newTicket);

      if (!ticket) {
        res.status(500).json({ message: "Error al crear el ticket " });
      }

      res.json({
        message: "Compra realizada con éxito",
        data: ticket,
        products: productWithStock,
      });
    } else {
      cart.products = [...productWithOutStock];
      const result = await cartService.updateOneCart(cid, cart);
      const remainingProducts = await cartService.getOneCart(cid);

      const newTicket = {
        code: Math.floor(Math.random() * 1000000),
        purchase_datetime: new Date().toLocaleString(),
        amount: totalPurchase - missingProductDiscount,
        purchaser: username,
      };

      const ticket = await ticketsService.createOneTicket(newTicket);
      if (!ticket) {
        res.status(500).json({ message: "Error al crear el ticket " });
      }

      res.json({
        message:
          "Compra realizada con éxito. Los siguietes productos no se pudieron comprar por falta de stock:",
        data: ticket,
        remainingProducts: productWithOutStock,
        products: productWithStock,
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Error al crear el ticket ", data: err });
  }
}

async function getAllTickets(req, res) {
  try {
    const tickets = await ticketsService.getAllTickets();
    res.json(tickets);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener los tickets", data: err });
  }
}

export { finishPurchase, getAllTickets };
