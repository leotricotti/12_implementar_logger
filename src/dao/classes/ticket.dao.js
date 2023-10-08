import ticketModel from "../models/ticket.model.js";

export default class TicketDao {
  //Método asyncrono para crear un ticket
  async createTicket(ticket) {
    try {
      const result = await ticketModel.create(ticket);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  //Método asyncrono para obtener todos los tickets
  async getAllTickets() {
    try {
      const result = await ticketModel.find();
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
