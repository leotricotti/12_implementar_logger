//Codigo que muestra la cantidad de productos en el carrito de compras
const cartBadge = async () => {
  const cartId = localStorage.getItem("cartId");
  const cartBadge = document.getElementById("cart-badge");
  try {
    if (!cartId) {
      cartBadge.innerText = 0;
    } else {
      const response = await fetch(
        `http://localhost:8080/api/carts/${cartId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error al obtener el carrito");
      }
      const cart = await response.json();
      cartBadge.innerHTML = `                
      <span
        id="cart-badge"
        class="basket-count"
        >${cart.products.length}</span
      >`;
    }
  } catch (error) {
    console.error(error);
  }
};

cartBadge();
