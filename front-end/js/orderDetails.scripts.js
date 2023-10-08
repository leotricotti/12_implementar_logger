// Funcion que crea un resumen de la compra
async function orderDetails() {
  const orderDetails = document.getElementById("order-container");
  const order = await JSON.parse(localStorage.getItem("order"));

  console.log(order);

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
        <div
          class="mx-n5 px-5 py-4"
          style="background-color: #f2f2f2"
        >
          <div class="row">
            <div class="col-md-8 col-lg-9">
              <p>${order.data.purchaser}</p>
            </div>
            <div class="col-md-4 col-lg-3">
              <p>${order.data.amount}</p>
            </div>
          </div>
        </div>
        <div class="row my-4">
        <div class="col-md-4 offset-md-8 col-lg-3 offset-lg-9">
          <p class="lead fw-bold mb-0">$ ${order.data.amount}</p>
        </div>
      </div>
      `;

  orderDetails.innerHTML = html;
}

orderDetails();
