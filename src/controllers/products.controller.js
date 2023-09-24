import { productsService } from "../repository/index.js";

// Método asyncrono para obtener todos los Productsos
async function getAll(req, res) {
  const { page, sort, category } = req.query;
  try {
    if (category) {
      const filteredProducts = await productsService.filteredProducts(category);
      res.json({
        products: filteredProducts.docs,
      });
    } else if (sort) {
      const orderedProducts = await productsService.orderedProducts(sort);
      res.json({
        products: orderedProducts,
      });
    } else {
      const paginatedProducts = await productsService.paginatedProducts(page);
      res.json({
        products: paginatedProducts.docs,
      });
    }
  } catch (err) {
    res.json({
      message: "Error al obtener los productos.",
      data: err,
    });
  }
}

// Método asyncrono para obtener un Productso
async function getOne(req, res) {
  const { pid } = req.params;
  try {
    const Products = await productsService.getOne(pid);
    if (Products) {
      res.json({
        Products: tempArray,
        styles: "Products.styles.css",
      });
    } else {
      res.status(404).json({
        message: "Productso no encontrado",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error al obtener el producto",
      data: err,
    });
  }
}

export { getAll, getOne };
