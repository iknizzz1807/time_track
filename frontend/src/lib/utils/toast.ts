import Toastify from "toastify-js";

const showWarningToast = (content: string) => {
  Toastify({
    text: content,
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #c93d54, #c93d3d)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
};

const showOKToast = (content: string) => {
  Toastify({
    text: content,
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #3fc93d, #3dc969)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
};

export { showWarningToast, showOKToast };
