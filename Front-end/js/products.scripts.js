const productsHandler = async (handler, index) => {
  if (!handler) handler = "page";
  if (!index) index = 1;

  const result = await fetch(
    `http://localhost:8080/api/products?${handler}=${index}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  const products = await result.json();
  const productsData = products.products;

  const productsContainer = document.getElementById("products-container");
  productsContainer.innerHTML = "";
  productsData.forEach((product) => {
    productsContainer.innerHTML += `
    <div class="col-md-12 col-xl-10 margin">
    <div class="card shadow-0 border rounded-3">
      <div class="card-body">
        <div class="row">
          <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
            ${product.thumbnail
              .map((img) => {
                return `
                <div class="bg-image hover-zoom ripple rounded ripple-surface">
                  <img src="${img.img1}" class="w-100" />
                  <a href="#!">
                    <div class="hover-overlay">
                      <div
                        class="mask"
                        style="background-color: rgba(253, 253, 253, 0.15)"
                      ></div>
                    </div>
                  </a>
                </div>
              `;
              })
              .join("")}
          </div>
          <div class="col-md-6 col-lg-6 col-xl-6">
            <h5>${product.title}</h5>
            <div class="d-flex flex-row">
              <div class="text-danger mb-1 me-2">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
              </div>
              <span> 310 </span>
            </div>
            <div class="mt-1 mb-0 text-muted small">
              <span>
                <b> Categoria: ${product.category} </b>
              </span>
            </div>
            <div class="mb-2 text-muted small">
              <span> Llega el martes </span>
              <span class="text-primary"> • </span>
              <span> Beneficio Tienda Puntos </span>
              <span class="text-primary"> • </span>
              <span>
                Stock disponible
                <br />
              </span>
            </div>
            <p class="text-truncate mb-4 mb-md-0">${product.description}</p>
          </div>
          <div
            class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start"
          >
            <div class="d-flex flex-row align-items-center mb-1">
              <h4 class="mb-1 me-1">${product.price}</h4>
              <span class="text-danger">
                <s> ${product.price} </s>
              </span>
            </div>
            <h6 class="text-success">Envio gratis</h6>
            <div class="d-flex flex-column mt-4">
              <button class="btn btn-primary btn-sm" type="button">
                Detalles
              </button>
              <button
                class="btn btn-outline-primary btn-sm mt-2"
                type="button"
                onclick="addProduct('${product._id}')"
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  });
};

productsHandler();

//Guardar cartId en localStorage
const saveCartId = (cartId) => {
  const localId = localStorage.getItem("cartId");
  if (!localId) {
    localStorage.setItem("cartId", cartId);
  }
};

//Obtener carrito
const getCartId = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/carts");
    const carts = await response.json();
    const lastCart = carts.carts[carts.carts.length - 1];
    saveCartId(lastCart._id);
  } catch (error) {
    console.log(error);
  }
};

getCartId();

// Ruta que agrega el id del carrito como referencia al usuario
const addCartId = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const email = user.email;
  return new Promise(async (resolve, reject) => {
    let cartId = localStorage.getItem("cartId");
    while (!cartId) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      cartId = localStorage.getItem("cartId");
    }
    const response = await fetch("http://localhost:8080/api/userCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartId,
        email,
      }),
    });
    resolve(response);
  });
};

addCartId();

// Agrega productos al carrito
const addProduct = async (idProduct) => {
  const cartId = localStorage.getItem("cartId");
  if (!cartId) {
    const response = await fetch(
      `http://localhost:8080/api/carts/${cartId}/product/${idProduct}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } else {
    const response = await fetch(
      `http://localhost:8080/api/carts/${cartId}/product/${idProduct}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          op: "add",
        }),
      }
    );
    if (response) showResult("Producto agregado con éxito");
    refreshPage();
    return response;
  }
};

// Función que actualiza la página
const refreshPage = () => {
  window.location.reload();
};
