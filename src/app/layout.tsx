"use client";

import type { Metadata } from "next";
import "./globals.css";
import { Inter, Noto_Sans_KR } from "next/font/google";
import { usePathname } from "next/navigation";
import Sidebar from "./components/Sidebar";

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html>
      <body className="w-full h-screen bg-[#ebebeb] text-[#282828] font-inter font-[400] leading-normal scrollbar-hide overflow-hidden">
        {pathname === "/auth" ? (
          <>{children}</>
        ) : (
          <div className="w-full h-full grid grid-cols-[min-content_auto] grid-rows-[10fr_1fr] gap-y-2 p-2 bg-[#232426]">
            <Sidebar />
            <div className="bg-neutral-700">{children}</div>
            <div className="col-span-2 bg-neutral-700"> 플레이어 </div>
          </div>
        )}
      </body>
    </html>
  );
}
