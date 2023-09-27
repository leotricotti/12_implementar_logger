//Capturar datos del formulario de registro y los envía al servidor
async function postLogin(username, password) {
  try {
    const response = await fetch("http://localhost:8080/api/sessions/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Usuario o contraseña incorrectos",
      });
      return;
    }

    const result = await response.json();

    if (!result) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Usuario o contraseña incorrectos",
      });
      return;
    }

    window.location.href =
      "file:///home/leonardo/Documentos/backend-curso/10_tercera_entrega/src/Front-end/html/products.html";
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

//Crea un carrito vacío en la base de datos
const createCart = async () => {
  if (localStorage.getItem("cartId")) {
    return;
  }
  const response = await fetch("http://localhost:8080/api/carts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      products: [],
    }),
  });
  const result = await response.json();
};

//Capturar datos del formulario de login y los envía al servidor
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-button");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  postLogin(username, password);
  createCart();
});

const userData = async () => {
  try {
    const result = await fetch("http://localhost:8080/api/sessions/current");
    const user = await result.json();
    console.log(user);
  } catch (error) {
    console.log(error);
  }
};

userData();
