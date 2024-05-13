import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/styles/themeProvider";
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
        className={cn("min-h-screen bg-[#E7E8EE] font-sans antialiased", fontSans.variable)}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthWrapper>{children}</AuthWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
