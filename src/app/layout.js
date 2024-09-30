import Navbar from "../components/Navbar";
import "./globals.css";
import Footer from "../components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Rubik } from 'next/font/google'
 
const rubik = Rubik({
  weight: '400',
  subsets: ['latin'],
})

export const metadata = {
  title: "iCommerce",
  description: "e-ticaret sitesi, mağaza, ürün sat, ürün satın al",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body  className={`bg-zinc-100 ${rubik.className}`}>
        <Navbar/>
        <main className="mx-auto lg:w-2/3 px-6 lg:px-0 pt-20 pb-28 min-h-screen">
        {children}
        </main>
        <Footer/>
      </body>
    </html>
    </ClerkProvider>
  );
}
