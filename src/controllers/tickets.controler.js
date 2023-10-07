import { ticketsService } from "../repository/index.js";

async function createTicket(req, res) {
  const { amount, purchaser } = req.body;
  try {
    const newTicket = {
      code: Math.floor(Math.random() * 1000000),
      purchase_datetime: new Date(),
      amount,
      purchaser,
    };

    const result = await ticketsService.createOneTicket(newTicket);
    if (!result) {
      return res.status(400).json({ message: "No se pudo crear el ticket" });
    }

    res.json({ message: "Ticket creado con éxito", data: newTicket });
  } catch (err) {
    res.status(500).json({ message: "Error al crear el ticket ", data: err });
  }
}

export { createTicket };
