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
    console.log(result);

    if (result.message === "No hay usuario logueado") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No hay usuario logueado",
        showConfirmButton: true,
      });
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
