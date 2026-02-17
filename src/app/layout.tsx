import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { NextUIProvider } from "@nextui-org/react";
import { Inter as FontSans } from "next/font/google";
import AuthWrapper from "@/components/AuthWrapper/AuthWrapper";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans"
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        suppressHydrationWarning={true}
        className={cn("min-h-screen bg-[#17181A] font-sans antialiased", fontSans.variable)}
      >
        <NextUIProvider>
          <AuthWrapper>{children}</AuthWrapper>
          <Toaster />
        </NextUIProvider>
      </body>
    </html>
  );
}
