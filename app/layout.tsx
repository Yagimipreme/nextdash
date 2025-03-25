'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useState } from "react";
import DropDownWithSearch from "./DropDownWithSearch";
import Ticker from "@/app/components/Ticker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

//render data directly in layout, (below)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [selectedOption, setSelectedOption] = useState<string | null>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);


const selectOption = (option:string) => {
  setSelectedOption(option);
  setSearchTerm("");
  setIsOpen(false);
  setTickerStandarts((prevStandarts) => [...prevStandarts, option]);
};

//create ws and do data-transform in a function here:
const [tickerStandarts, setTickerStandarts] = useState([
    "btcusdt",
    "solusdt",
    "ftmusdt",
    "ethusdt",
]);

  return (
    <html lang="en">
      <div className="flex justify-between items-center border-blue-400 border-gray-200">
        <DropDownWithSearch
          selectedOption={selectedOption}
          searchTerm={searchTerm}
          isOpen={isOpen}
          setSearchTerm={setSearchTerm}
          setIsOpen={setIsOpen}
          selectOption={selectOption}
        />
        {tickerStandarts.map((option) => (
          <div key={option}>
            <Ticker symbol={option} />

          </div>
        ))}
      </div>

    
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
