const socket = io("http://localhost:8080");
let chatBox = document.getElementById("textAreaExample");

// Socket events
chatBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      socket.emit("message", {
        message: chatBox.value,
      });
      chatBox.value = "";
    }
  }
});

socket.on("messageLogs", (data) => {
  let log = document.getElementById("message-logs");
  let message = "";

  data.forEach((elem) => {
    message += `
    <div class="d-flex flex-row justify-content-end mb-4">
    <div
      class="p-3 me-3 border"
      style="border-radius: 15px; background-color: #fbfbfb"
    >
      <p class="small mb-0">
   ${elem.mensaje}
      </p>
    </div>
    <img
      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
      alt="avatar 1"
      style="width: 45px; height: 100%"
    />
  </div>
  <div class="d-flex flex-row justify-content-start mb-4">
  <img
    class="rounded-circle"
    src="../img/logo.jpg"
    alt="avatar 1"
    style="width: 45px; height: 100%"
  />
  <div
    class="p-3 ms-3"
    style="
      border-radius: 15px;
      background-color: rgba(57, 192, 237, 0.2);
    "
  >
    <p class="small mb-0">
      ${elem.respuesta}
    </p>
  </div>
</div>
    `;
  });

  log.innerHTML = message;
});
