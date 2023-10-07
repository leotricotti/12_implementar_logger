import { ticketsService } from "../repository/index.js";
import { productsService } from "../repository/index.js";
// import userCart from "./userCart.controller.js";

async function createTicket(req, res) {
  const { username, totalPurchase, products } = req.body;
  // const { cartId } = req.params;
  try {
    const productsList = await productsService.getAllProducts();

    console.log(products);

    // const productWithOutStock = productsList.findIndex(
    //   (product) => product.stock >= product
    // );

    // if (productWithOutStock) {
    //   const newUserCart
    //   return res.status(400).json({ message: "No hay stock disponible" });
    // }

    const newTicket = {
      code: Math.floor(Math.random() * 1000000),
      purchase_datetime: new Date().toLocaleString(),
      amount: totalPurchase,
      purchaser: username,
    };

    console.log(newTicket);

    res.json({ message: "Ticket creado con éxito", data: newTicket });

    // const result = await ticketsService.createOneTicket(newTicket);
    // if (!result) {
    //   return res.status(400).json({ message: "No se pudo crear el ticket" });
    // }

    // res.json({ message: "Ticket creado con éxito", data: newTicket });
  } catch (err) {
    res.status(500).json({ message: "Error al crear el ticket ", data: err });
  }
}

export { createTicket };
