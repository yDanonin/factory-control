import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/styles/themeProvider";
import { Providers } from "@/app/providers";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans"
});

interface IProps {
  children: React.ReactNode;
  session: Session;
}

export default function RootLayout({ children, session }: IProps) {
  console.log("aaaaaaaaaa", session);
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        suppressHydrationWarning={true}
        className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}
      >
        <Providers session={session}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
