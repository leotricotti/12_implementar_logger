//Mostrar resultado operación por SweetAlert2
const showResult = (result) => {
  if (result) {
    Swal.fire({
      icon: "success",
      title: result,
      showConfirmButton: false,
      timer: 2000,
      showClass: {
        popup: "animate__animated animate__zoomInDown",
      },
    });
  } else
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Algo salió mal! Vuelve a intentarlo",
      showConfirmButton: true,
      confirmButtonText: "Aceptar",
      showClass: {
        popup: "animate__animated animate__zoomInDown",
      },
    });
};
