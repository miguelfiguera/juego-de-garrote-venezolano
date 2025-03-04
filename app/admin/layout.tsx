// app/alternative-layout/layout.tsx

import React, { ReactNode } from "react";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import { ToastContainer } from "react-toastify";

interface AlternativeLayoutProps {
  children: ReactNode;
}

//different layout for the admin module
export default function AlternativeLayout({
  children,
}: AlternativeLayoutProps) {
  return (
    <html>
      <head>
        <title>Administrator</title>
        {/* Add any specific metadata or CSS links here */}
      </head>
      <body>
        <ToastContainer />
        <AdminSidebar />
        <div>{children}</div>
        <script
          src="https://kit.fontawesome.com/248fbe1e54.js"
          crossOrigin="anonymous"
          defer
        ></script>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        ></link>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossOrigin="anonymous"
          defer
        ></script>
      </body>
    </html>
  );
}
