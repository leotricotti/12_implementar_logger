export default class UsersRepository {
  constructor(dao) {
    this.dao = dao;
  }

  //Método asyncrono realizar el login
  async login(username, password) {
    try {
      const result = await this.dao.find({
        email: username,
        password,
      });
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  //Metodo asyncrono para realizar el signup
  async signup(user) {
    try {
      const result = await this.dao.create(user);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  //Método asyncrono para obtener un usuario
  async getOne(uid) {
    try {
      const result = await this.dao.getOne(uid);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  //Metodo asyncrono que actualiza la contraseña
  async updatePassword(user, newPassword) {
    try {
      const respuesta = await this.dao.findByIdAndUpdate(user, {
        password: newPassword,
      });
      return respuesta;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  //Método asyncrono para actualizar el carrito
  async updateCart(id, user) {
    try {
      const respuesta = await this.dao.findByIdAndUpdate(id, user);
      return respuesta;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  //Método asyncrono para popular el carrito
  async populateCart(cartId) {
    try {
      const result = await this.dao
        .findById(cartId)
        .populate("products.product");
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
