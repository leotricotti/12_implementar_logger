async function orderDetails(order) {
  const orderDetails = document.getElementById("order-container");

  const html = order.map((item) => {
    return `
      <div class="row">
      <div class="col mb-3">
        <p class="small text-muted mb-1">Fecha</p>
        <p>10 April 2021</p>
      </div>
      <div class="col mb-3">
        <p class="small text-muted mb-1">Orden N°</p>
        <p>012j1gvs356c</p>
      </div>
    </div>

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
      <div class="row">
        <div class="col-md-8 col-lg-9">
          <p class="mb-0">Shipping</p>
        </div>
        <div class="col-md-4 col-lg-3">
          <p class="mb-0">£33.00</p>
        </div>
      </div>
    </div>
      `;
  });
  orderDetails.innerHTML = html.join("");
}
