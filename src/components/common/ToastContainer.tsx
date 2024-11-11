import { Toaster } from "react-hot-toast";

export default function ToastContainer() {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          className: "",
          duration: 5000,
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
        }}
      />
    </>
  );
}
