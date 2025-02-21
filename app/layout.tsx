import type { Metadata } from "next";
import { Raleway } from "@next/font/google";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/GeneralUse/Navbar";
import Footer from "@/components/GeneralUse/Footer";
//import "./globals.css";

const raleway = Raleway({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Juego de Garrote Venezolano",
  description:
    "App para la difusion del Juego de Garrote Venezolano, cortesia del Patio Ambrosio Aguilar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        <ToastContainer />
        <Navbar />
        {children}
        <Footer />
      </body>

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
    </html>
  );
}
