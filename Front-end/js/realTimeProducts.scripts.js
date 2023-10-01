// Obtener el formulario de agregar producto
const form = document.getElementById("add-product-form");
form.addEventListener("submit", handleSubmit);

// Función para manejar el envío del formulario
async function handleSubmit(e) {
  e.preventDefault();

  const { title, description, code, price, stock, category, thumbnail } =
    form.elements;
  if (
    !title.value ||
    !description.value ||
    !code.value ||
    !price.value ||
    !stock.value ||
    !category.value ||
    !thumbnail.value
  ) {
    return Swal.fire({
      icon: "error",
      title: "Lo siento...",
      text: "Todos los campos son necesarios!",
      focusConfirm: true,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
    });
  } else {
    const product = {
      title: title.value,
      description: description.value,
      code: code.value,
      price: price.value,
      stock: stock.value,
      category: category.value,
      thumbnail: thumbnail.value,
    };
    const response = await fetch("http://localhost:8080/api/realtimeproducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal! Vuelve a intentarlo",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Producto agregado con exito!",
        showConfirmButton: true,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
      });
    }
  }
  // Limpiar todos los campos del formulario
  for (let i = 0; i < form.elements.length; i++) {
    form.elements[i].value = "";
  }
}

// Función para actualizar la lista de productos
async function updateProductList() {
  const productList = document.getElementById("products-list");
  productList.innerHTML = "";

  try {
    const result = await fetch("http://localhost:8080/api/realTimeProducts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (result.status === 404) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal! Vuelve a intentarlo",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
      });
    }

    const products = await result.json();

    products.data.forEach((product) => {
      //Capturar la url de la imagen
      const imageUrl = product.thumbnail[0]["img1"];

      const container = document.createElement("div");
      container.classList.add("list-group-item");

      container.innerHTML = `
        <div class="d-flex w-100 justify-content-between flex-column">
          <h2 class="mb-1 subtitle">${product.title}</h2>
          <p class="mb-1"><strong>Descripción:</strong> ${product.description}</p>
          <p class="mb-1"><strong>Codigo:</strong> ${product.code}</p>
          <p class="mb-1"><strong>Precio:</strong> ${product.price}</p>
          <p class="mb-1"><strong>Status:</strong> ${product.status}</p>
          <p class="mb-1"><strong>Stock:</strong> ${product.stock}</p>
          <p class="mb-1"><strong>Categoria:</strong> ${product.category}</p>
        </div>
        <img src="${imageUrl}" alt="img" width="150" class="thumbnail position-absolute me-5 mt-5 end-0 top-0">
        <button type="button" class="btn btn-primary delete-product-btn">Eliminar</button>
      `;

      const btnEliminar = container.querySelector(".delete-product-btn");
      btnEliminar.addEventListener("click", () => {
        eliminarProducto(product.id);
      });

      productList.appendChild(container);
    });
  } catch (error) {
    console.log(error);
  }
}
updateProductList();

// // Eliminar un producto de la lista de productos
// function eliminarProducto(id) {
//   socketIo.on("products", (products) => {
//     updateProductList(products);
//   });
//   Swal.fire({
//     icon: "success",
//     title: "Producto eliminado con exito!",
//     showConfirmButton: true,
//     showClass: {
//       popup: "animate__animated animate__fadeInDown",
//     },
//   });
// }
