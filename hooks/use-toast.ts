// // src/hooks/use-toast.ts
// import { toast } from "";

import { useState, useEffect } from "react";

interface ToastState {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
  isVisible: boolean;
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastState>({
    title: "",
    isVisible: false,
  });

  const showToast = (title: string, description?: string, variant: "default" | "destructive" = "default") => {
    setToast({ title, description, variant, isVisible: true });
  };

  useEffect(() => {
    if (toast.isVisible) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, isVisible: false }));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast.isVisible]);

  return { toast, showToast };
};
