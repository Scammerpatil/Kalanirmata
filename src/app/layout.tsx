"use client";
import ToastContainer from "@/components/common/ToastContainer";
import Navbar from "@/components/common/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          Kalanirmata | Time Table generator for SES's R. C. Patel Institute of
          Technology
        </title>
      </head>
      <body className={``}>
        <ToastContainer />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
