import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "./_components/QueryProvider";

export const metadata: Metadata = {
  title: "Gyan Jyoti LMS",
  description: "School operations, attendance, and academic planning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
