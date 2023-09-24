export default class ProductsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  // Método asyncrono para obtener todos los productos
  getAllProducts = async () => {
    const result = await this.dao.getAll();
    return result;
  };

  // Método asyncrono para obtener un producto
  getOneProduct = async (id) => {
    const result = await this.dao.getOne(id);
    return result;
  };

  // Método asyncrono para crear un producto
  saveOneProducts = async (product) => {
    const result = await this.dao.saveProducts(product);
    return result;
  };

  // Método asyncrono para actualizar un producto
  updateOneProducts = async (id, product) => {
    const result = await this.dao.updateProducts(id, product);
    return result;
  };

  //Método asyncrono para obtener los productos filtrados por categoría
  filteredAllProducts = async (category) => {
    const result = await this.dao.filteredProducts(category);
    return result;
  };

  //Método asyncrono para obtener los productos ordenados
  orderedAllProducts = async (order) => {
    const result = await this.dao.orderedProducts(order);
    return result;
  };

  //Método asyncrono para obtener los productos paginados
  paginatedAllProducts = async (page) => {
    const result = await this.dao.paginatedProducts(page);
    return result;
  };
}
