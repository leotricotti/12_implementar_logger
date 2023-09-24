export default class ProductsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  // Método asyncrono para obtener todos los productos
  getAll = async () => {
    try {
      const result = await this.dao.getAll();
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  // Método asyncrono para obtener un producto
  getOne = async (id) => {
    try {
      const result = await this.dao.getOne(id);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  // Método asyncrono para crear un producto
  saveProducts = async (product) => {
    try {
      const result = await this.dao.saveProducts(product);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  // Método asyncrono para actualizar un producto
  updateProducts = async (id, product) => {
    try {
      const result = await this.dao.updateProducts(id, product);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  //Método asyncrono para obtener los productos filtrados por categoría
  filteredProducts = async (category) => {
    try {
      const result = await this.dao.filteredProducts(category);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  //Método asyncrono para obtener los productos ordenados
  orderedProducts = async (order) => {
    try {
      const result = await this.dao.orderedProducts(order);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  //Método asyncrono para obtener los productos paginados
  paginatedProducts = async (page) => {
    try {
      const result = await this.dao.paginatedProducts(page);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
}
