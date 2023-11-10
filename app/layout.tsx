import { Nunito } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientOnly from "./components/ClientOnly";

//Modals
import RegisterModal from "./components/Modals/RegisterModal";
import LoginModal from "./components/Modals/LoginModal";
import RentModal from "./components/Modals/RentModal";

import TosterProvider from "./providers/TosterProvider";
import getCurrentUser from "./actions/getCurrentUser";



export const metadata: Metadata = {
  title: "Full-Stack Airbnb Clone",
  description: "Airbnb clone",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <TosterProvider />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>

        {children}
      </body>
    </html>
  );
}
