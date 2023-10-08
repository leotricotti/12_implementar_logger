// Funcion que crea un resumen de la compra
async function orderDetails() {
  const productsData = [];
  const orderDetails = document.getElementById("order-container");
  const order = await JSON.parse(localStorage.getItem("order"));

  productsData.push(order.products);

  const html = `
    <div class="row">
      <div class="col mb-3">
        <p class="small text-muted mb-1">Fecha</p>
        <p>${order.data.purchase_datetime}</p>
      </div>
      <div class="col mb-3">
        <p class="small text-muted mb-1">Orden N°</p>
        <p>${order.data.code}</p>
      </div>
    </div>
    <div class="mx-n5 px-5 py-4" style="background-color: #f2f2f2">
    ${productsData[0]
      .map((item) => {
        return `
      <div class="row">
          <div class="col-md-8 col-lg-6">
            <p>${item.product.title}</p>
          </div>
          <div class="col-md-4 col-lg-3">
          <p>${item.quantity}</p>
        </div>
          <div class="col-md-4 col-lg-3">
            <p>$ ${item.product.price}</p>
          </div>
        </div>
      `;
      })
      .join("")}
    </div>
        <div class="row my-4">
        <div class="col-md-4 offset-md-8 col-lg-3 offset-lg-8 d-flex w-50">
          <p class="lead fw-bold mb-0 me-2">Total:</p>
          <p class="lead fw-bold mb-0">$${order.data.amount}</p>
        </div>
      </div>
      `;

  orderDetails.innerHTML = html;
}

orderDetails();

document.getElementById("order-detail-btn").addEventListener("click", () => {
  localStorage.removeItem("order");
  window.location.href = "index.html";
});
