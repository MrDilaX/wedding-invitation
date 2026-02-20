import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chanaka & Ganguni — Wedding Invitation",
  description: "Join us as we celebrate our love and begin our forever together.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
