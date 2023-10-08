export default class TicketsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  // Método asyncrono para crear un ticket
  createOneTicket = async (ticket) => {
    const result = await this.dao.createTicket(ticket);
    return result;
  };

  // Método asyncrono para obtener todos los tickets
  getAllTickets = async () => {
    const result = await this.dao.getAllTickets();
    return result;
  };
}
