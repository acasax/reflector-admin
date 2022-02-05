import { toast } from "react-toastify";
import { TypeOptions } from "react-toastify/dist/types";

type TToastProps = {
  text: string;
  timer?: number;
  type?: TypeOptions;
}

export const useToast = () => {

  const _toast = ({
     text,
     timer = 3000,
     type = "success"
  }: TToastProps) => toast(text, {
    position: "top-right",
    autoClose: timer,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    type,
    progress: undefined
  });

  const toastSuccess = (text: string, timer?: number) => {
    _toast({
      text
    });
  };

  const toastError = (text: string, timer?: number) => {
    _toast({
      text,
      type: "error"
    });
  };

  return {
    toastSuccess,
    toastError
  };
};