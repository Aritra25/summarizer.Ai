// components/ui/toast.tsx

import React from "react";
import { X } from "lucide-react";

export interface ToastProps {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ 
  title, 
  description, 
  variant = "default",
  isVisible,
  onClose 
}) => {
  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 rounded-md p-4 shadow-lg transition-all duration-300 transform ${
        variant === "destructive" ? "bg-red-500 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="font-bold">{title}</div>
          {description && <div className="text-sm mt-1">{description}</div>}
        </div>
        <button 
          className="ml-4 hover:opacity-70 transition-opacity" 
          onClick={onClose}
          aria-label="Close"
        >
          <X className="h-4 w-4 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
