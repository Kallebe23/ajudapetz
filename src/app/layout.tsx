import { auth } from "@/auth";
import CustomSessionProvider from "@/components/CustomSessionProvider";
import Header from "@/components/header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ajuda Petz",
  description: "Adote ou anuncie um animal de estimação",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomSessionProvider session={session}>
          <Header />
          <main className="min-h-[calc(100vh-80px)] max-w-screen-2xl m-auto p-4">
            {children}
          </main>
          <footer className="border-t p-4 mt-18 mt-12">
            <p className="text-center">
              Feito por{" "}
              <a
                target="_blank"
                className="underline"
                href="https://www.linkedin.com/in/kallebe-gomes-851a8a197/"
              >
                Kallebe
              </a>{" "}
              &#169;
            </p>
          </footer>
          <Toaster />
        </CustomSessionProvider>
      </body>
    </html>
  );
}
