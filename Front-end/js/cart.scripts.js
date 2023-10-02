//Incrementa la cantidad de un producto en el carrito
const increaseQuantity = async (idProduct) => {
  const cartId = localStorage.getItem("cartId");

  const response = await fetch(
    `http://localhost:8080/api/carts/${cartId}/product/${idProduct}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        op: "add",
      }),
    }
  );

  const cart = await response.json();

  if (cart.data.products.length > 0) {
    Swal.fire({
      icon: "success",
      title: "Producto agregado con éxito",
      showConfirmButton: true,
      showClass: {
        popup: "animate__animated animate__zoomIn",
      },
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "No hay stock disponible",
      showConfirmButton: true,
      showClass: {
        popup: "animate__animated animate__zoomIn",
      },
    });
  }

  refreshPage();

  return response;
};

//Decrementa la cantidad de un producto en el carrito
const decreaseQuantity = async (idProduct) => {
  const cartId = localStorage.getItem("cartId");

  const response = await fetch(
    `http://localhost:8080/api/carts/${cartId}/product/${idProduct}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        op: "substract",
      }),
    }
  );

  const cart = await response.json();

  if (cart.data.products.length > 0) {
    Swal.fire({
      icon: "success",
      title: "Producto eliminado con éxito",
      showConfirmButton: true,
      showClass: {
        popup: "animate__animated animate__zoomIn",
      },
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Error al eliminar producto",
      showConfirmButton: true,
      showClass: {
        popup: "animate__animated animate__zoomIn",
      },
    });
  }

  refreshPage();

  return response;
};

//Elimina un producto del carrito
const deleteProduct = async (idProduct) => {
  const cartId = localStorage.getItem("cartId");

  const response = await fetch(
    `http://localhost:8080/api/carts/${cartId}/product/${idProduct}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  if (response) {
    Swal.fire({
      icon: "success",
      title: "Producto eliminado con éxito",
      showConfirmButton: true,
      showClass: {
        popup: "animate__animated animate__zoomIn",
      },
    });
  }

  console.log(response);
  // refreshPage();

  return response;
};

//Elimina todos los productos del carrito
const deleteAllProducts = async () => {
  //Obtener cartId de localStorage
  const cartId = localStorage.getItem("cartId");
  const response = await fetch(`http://localhost:8080/api/carts/${cartId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  Swal.fire({
    title: "¿Estás seguro?",
    text: "¡No podrás revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, vaciar carrito",
    cancelButtonText: "Cancelar",
    showClass: {
      popup: "animate__animated animate__zoomIn",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "Carrito vaciado con éxito",
        showConfirmButton: true,
        showClass: {
          popup: "animate__animated animate__zoomIn",
        },
      });
    }
  });

  refreshPage();
  return response;
};

//Refrescar página
const refreshPage = () => {
  setTimeout(() => {
    window.location.reload();
  }, 1800);
};

//Direccionar a la pagina de productos anterior
const continueBuying = (page) => {
  page = localStorage.getItem("currentPage");
  window.location.href = `http://127.0.0.1:5500/html/products.html`;
};

//Finalizar compra
const finishBuy = () => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "¡No podrás revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, finalizar compra",
    cancelButtonText: "Cancelar",
    showClass: {
      popup: "animate__animated animate__zoomIn",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "¡Compra finalizada con éxito!",
        text: "En unos minutos recibirás un correo con los detalles de tu compra",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
        showClass: {
          popup: "animate__animated animate__zoomIn",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("cartId");
          window.location.href = "../html/index.html";
          logout();
        }
      });
    }
  });
};

const showCartProducts = async () => {
  const cartId = localStorage.getItem("cartId");

  try {
    const response = await fetch(
      `http://localhost:8080/api/carts/populated/${cartId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const cart = await response.json();
    const products = cart.data.products;
    let html = "";
    let cartNav = "";
    if (products.length > 0) {
      cartNav += `
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-10">
            <h3
              class="fw-normal text-black mb-5 text-decoration-underline text-center"
            >
              Carrito de compras
            </h3>
            <nav
              class="d-flex justify-content-between mb-3 nav-products flex-wrap"
            >
              <button
                class="btn btn-secondary btn-sm mb-2"
                onclick="continueBuying()"
                type="button"
              >
                Seguir comprando
              </button>
              <button
                class="btn btn-secondary btn-sm mb-2"
                type="button"
                onclick="deleteAllProducts()"
              >
                Vaciar carrito
              </button>
              <button
                class="btn btn-secondary btn-sm mb-2"
                type="button"
                onclick="finishBuy()"
              >
                Finalizar compra
              </button>
            </nav>
            </div>`;
    }

    products.map((product) => {
      html += `
      <div class="card rounded-3 mb-4" id="cart-container">
          <div class="card-body p-4">
            <div class="product-cart">
              <div class="row d-flex justify-content-between align-items-center mb-3 mt-3">
                ${product.product.thumbnail
                  .map((img) => {
                    return `
                      <div class="col-md-2 col-lg-2 col-xl-2">
                        <img
                          src="${img.img1}"
                          class="img-fluid rounded-3"
                          alt="Cotton T-shirt"
                        />
                      </div>
                    `;
                  })
                  .join("")}
                <div class="col-md-3 col-lg-3 col-xl-3 mt-2">
                  <p class="lead fw-normal mb-2">
                    Producto:
                    <span class="text-muted"> ${product.product.title}</span>
                  </p>
                </div>
                <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                  <button
                    class="btn btn-link px-2"
                    onclick="decreaseQuantity('${product.product._id}')"
                  >
                    <i class="fas fa-minus"></i>
                  </button>
                  <input
                    name="quantity"
                    value="${product.quantity}"
                    type="text"
                    class="form-control form-control-sm text-center"
                  />
                  <button
                    class="btn btn-link px-2"
                    onclick="increaseQuantity('${product.product._id}')"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
                <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1 mb-4 mt-4">
                  <h5 class="mb-0">$${(
                    product.product.price * product.quantity
                  ).toFixed(2)}</h5>
                </div>
                <div class="col-md-1 col-lg-1 col-xl-1 text-danger trash-icon" onclick="deleteProduct('${
                  product.product._id
                }')">
                  <i class="fas fa-trash fa-lg"></i>
                </div>
              </div>
            </div>
          </div>
          </div>
        `;
    });

    if (products.length === 0) {
      html += `
        <nav class="d-flex mb-3 nav-products flex-wrap justify-content-center">
          <h3 class="fw-normal text-black mb-2">Aún no hay productos</h3>
          <button class="btn btn-secondary btn-sm" type="button">
            <a href="http://127.0.0.1:5500/html/products.html"> Ir a comprar </a>
          </button>
        </nav>
      `;
    }

    document.getElementById("cart-nav-container").innerHTML = cartNav;
    document.getElementById("cart-container").innerHTML = html;
  } catch (error) {
    console.error(error);
  }
};

showCartProducts();
