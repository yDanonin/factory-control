import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import { Toaster } from "@/components/ui/toaster";
import { NextUIProvider } from "@nextui-org/react";
import { Inter as FontSans } from "next/font/google";
import AuthWrapper from "@/components/AuthWrapper/AuthWrapper";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans"
});

interface IProps {
  children: React.ReactNode;
  session: Session;
}

export default function RootLayout({ children, session }: IProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        suppressHydrationWarning={true}
        className={cn("min-h-screen bg-[#17181A] font-sans antialiased", fontSans.variable)}
      >
        <NextUIProvider>
          <AuthWrapper session={session}>{children}</AuthWrapper>
          <Toaster />
        </NextUIProvider>
      </body>
    </html>
  );
}
