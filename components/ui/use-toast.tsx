// components/ui/use-toast.ts

import { ToastProps } from "@/components/ui/toast";
import { useState } from "react";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000;

const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = (toast: ToastProps) => {
    setToasts((currentToasts) => [...currentToasts, toast]);

    setTimeout(() => {
      setToasts((currentToasts) => currentToasts.slice(1));
    }, TOAST_REMOVE_DELAY);
  };

  return { toast };
};

export { useToast };
