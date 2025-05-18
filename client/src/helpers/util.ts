import { toast } from "react-toastify";

export const handleSuccess = (msg: string) => {
  toast.success(msg, { position: "top-right" });
};

export const handleError = (msg: string) => {
  toast.dismiss();
  console.log("handle error");
  toast.error(msg, {
    position: "top-right",
    toastId: Math.random().toString(),
  });
};
