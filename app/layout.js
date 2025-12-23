import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "ZenCash",
  description: "One stop Finance Platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className="">
        <body className={`${inter.className}`} >
          <Header></Header>
          <main className="min-h-screen">
            {children}
          </main>
          <Toaster richColors />

          <footer className="bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 py-12">
            <div className="container mx-auto px-4 text-center text-gray-600">
              Made by Bipul.corp
            </div>
          </footer>


        </body>
      </html>
    </ClerkProvider>
  );
}
