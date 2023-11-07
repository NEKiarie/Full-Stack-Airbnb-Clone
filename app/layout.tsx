import { Nunito } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/Modals/RegisterModal";
import TosterProvider from "./providers/TosterProvider";
import LoginModal from "./components/Modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";

const inter = Inter({ subsets: ["latin"] });

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
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <TosterProvider />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser = {currentUser} />
        </ClientOnly>

        {children}
      </body>
    </html>
  );
}
