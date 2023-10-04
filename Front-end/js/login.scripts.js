// Funcion que captura la información del usuario y la envía almacena en el local storage
const getUser = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/sessions/current", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const result = await response.json();
    const role = result.data.role;

    if (result) {
      localStorage.setItem("user", JSON.stringify(result.data));
    }

    if (role === "admin") {
      window.location.href = "http://127.0.0.1:5500/html/realTimeProducts.html";
    } else {
      window.location.href = "http://127.0.0.1:5500/html/products.html";
    }

    return result;
  } catch (error) {
    console.log(error);
  }
};

//Capturar datos del formulario de login y los envía al servidor
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-button");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  postLogin(username, password);
});

async function postLogin(username, password) {
  try {
    const response = await fetch("http://localhost:8080/api/sessions/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    localStorage.setItem("token", result.token);

    if (result.message === "Login correcto") {
      getUser();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Usuario o contraseña incorrectos",
        showConfirmButton: true,
        showClass: {
          popup: "animate__animated animate__zoomIn",
        },
      });
    }

    return result;
  } catch (error) {
    console.log(error);
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
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      products: [],
    }),
  });
  const result = await response.json();
};

// Ruta que realiza el login con github

const githubLogin = async () => {
  const response = await fetch("http://localhost:8080/api/sessions/github", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  window.location.href = result.url;
};
