export default class CartsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  // Método asyncrono para obtener todos los carritos
  getAll = async () => {
    try {
      const result = await this.dao.getAll();
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  // Método asyncrono para obtener un carrito
  getOne = async (id) => {
    try {
      const result = await this.dao.getOne(id);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  // Método asyncrono para crear un carrito
  saveCart = async (cart) => {
    try {
      const result = await this.dao.saveCart(cart);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  // Método asyncrono para eliminar un producto del carrito
  updateCart = async (id, cart) => {
    try {
      const result = await this.dao.updateCart(id, cart);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  // Método asyncrono para vaciar el carrito
  emptyCart = async (id, cart) => {
    try {
      const result = await this.dao.emptyCart(id, cart);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  // Método asyncrono para popular el carrito
  populatedCart = async (id) => {
    try {
      const result = await this.dao.populatedCart(id);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
}
