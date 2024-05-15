import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";
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

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        suppressHydrationWarning={true}
        className={cn("min-h-screen bg-[#17181A] font-sans antialiased", fontSans.variable)}
      >
        <AuthWrapper>{children}</AuthWrapper>
      </body>
    </html>
  );
}
