import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/fragment/navbar";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
});

export const metadata: Metadata = {
  title: "Tripzy - Travel Smarter, Not Harder",
  description:
    "Make every trip effortless. Tripzy lets you book rides and plan journeys with ease",
  keywords:
    "Travel, Tripzy, Ride Booking, Journey Planning, Smart Travel, Effortless Trips, Travel App, Trip Management",
  icons: {
    icon: "/images/logo.svg",
    shortcut: "/images/logo.svg",
    apple: "/images/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunitoSans.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
