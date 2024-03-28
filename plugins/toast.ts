import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const showToast = (message: string, method: string = "success") => {
  const options = {
    autoClose: 3000,
    position: toast.POSITION.BOTTOM_RIGHT,
    hideProgressBar: true,
    transition: toast.TRANSITIONS.SLIDE,
  };
  switch (method) {
    case "error":
      toast.error(message, options);
      break;
    case "success":
      toast.success(message, options);
      break;
    default:
      toast.info(message, options);
      break;
  }
};

export default defineNuxtPlugin(() => {
  return {
    provide: {
      showToast,
    },
  };
});
