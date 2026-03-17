import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const dieGrotesk = localFont({
  src: "../fonts/test-die-grotesk-b-regular.woff2",
  variable: "--font-die-grotesk",
  display: "swap"
});

export const metadata: Metadata = {
  title: "JB52",
  description: "JB52 is a full-service creative studio based in New York City."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={dieGrotesk.className}
        style={{ ["--font-sans" as string]: dieGrotesk.style.fontFamily }}
      >
        {children}
      </body>
    </html>
  );
}
