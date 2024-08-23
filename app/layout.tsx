import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css"; 

const mont = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Personalised Health Companion",
  icons: {icon:'/Robo.ico'},
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href='/Robo.ico' sizes="any" />
      </head>
      <body className={mont.className}>{children}</body>
    </html>
  );
}
