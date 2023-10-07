export default class TicketsRepository {
  createOneTicket = async (ticket) => {
    const result = await this.dao.createTicket(ticket);
    return result;
  };
}
