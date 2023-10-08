// Funcion que crea un resumen de la compra
async function orderDetails(order) {
  const orderDetails = document.getElementById("order-container");

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
    ${order
      .map((item) => {
        return `
        <div
          class="mx-n5 px-5 py-4"
          style="background-color: #f2f2f2"
        >
          <div class="row">
            <div class="col-md-8 col-lg-9">
              <p>BEATS Solo 3 Wireless Headphones</p>
            </div>
            <div class="col-md-4 col-lg-3">
              <p>£299.99</p>
            </div>
          </div>
        </div>
      `;
      })
      .join("")}
  `;

  orderDetails.innerHTML = html;
}
