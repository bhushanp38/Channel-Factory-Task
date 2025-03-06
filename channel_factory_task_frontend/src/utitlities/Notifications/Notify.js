import { Flip, toast } from "react-toastify";

const toastConf = {
  position: "top-right",
  autoClose: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  pauseOnFocusLoss: false,
  hideProgressBar: true,
  className: "my-toast",
  theme: "dark",
  transition: Flip,
};

const notify = (msg, type) => {
  switch (type) {
    case "success":
      toast.success(msg, toastConf);
      break;
    case "error":
      toast.error(msg, toastConf);
      break;
    case "warning":
      toast.warning(msg, toastConf);
      break;
    case "info":
      toast.info(msg, toastConf);
      break;
    default:
      toast.error(msg, toastConf);
  }
};

export default notify;
