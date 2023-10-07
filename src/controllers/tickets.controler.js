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

    if (productWithOutStock === undefined) {
      cart.products = [];
      const result = await cartService.updateOneCart(cid, cart);
      return res.json({
        message: "Compra realizada con éxito",
        data: result,
      });
    } else {
      cart.products = [productWithOutStock];
      const result = await cartService.updateOneCart(cid, cart);

      const cart = await cartService.getOneCart(cid);

      console.log(cart);

      // return res.json({
      //   message:
      //     "Compra realizada con éxito. Los siguietes productos no se pudieron comprar por falta de stock:",
      //   data: result,
      // });
    }

    // const newTicket = {
    //   code: Math.floor(Math.random() * 1000000),
    //   purchase_datetime: new Date().toLocaleString(),
    //   amount: totalPurchase,
    //   purchaser: username,
    // };

    // res.json({ message: "Ticket creado con éxito", data: newTicket });

    // const result = await ticketsService.createOneTicket(newTicket);
    // if (!result) {
    //   return res.status(400).json({ message: "No se pudo crear el ticket" });
    // }

    // res.json({ message: "Ticket creado con éxito", data: newTicket });
  } catch (err) {
    res.status(500).json({ message: "Error al crear el ticket ", data: err });
  }
}

export { finishPurchase };
