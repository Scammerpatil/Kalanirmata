import { AxiosResponse } from "axios";
import React from "react";
import toast from "react-hot-toast";

interface ToastMessages {
  loading: string;
  success: string;
  error: string;
}

/**
 * Show a toast with daisyUI theme styles using `toast.promise`.
 * @param promise - The promise to resolve.
 * @param messages - Messages to show for loading, success, and error states.
 */

export const ShowCustomToast = (
  promise: Promise<AxiosResponse<any, any>>,
  messages: ToastMessages
): Promise<AxiosResponse<any, any>> => {
  return toast.promise(
    promise,
    {
      loading: (
        <div className="flex items-center gap-2">
          <span className="loading-spinner" role="status" />
          <span>{messages.loading}</span>
        </div>
      ),
      success: (
        <div className="flex items-center gap-2 text-success">
          <span>{messages.success}</span>
        </div>
      ),
      error: (
        <div className="flex items-center gap-2 text-error">
          <span>{messages.error}</span>
        </div>
      ),
    },
    {
      style: {
        backgroundColor: "var(--b3)",
        color: "var(--bc)",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        zIndex: 9999,
      },
      duration: 4000,
    }
  );
};
