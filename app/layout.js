import "./globals.css";
import { Urbanist } from "next/font/google";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata = {
  title: "LyraVerseAI",
  description: "Inspire, be insprired",
};

export const dynamic = "force-dynamic";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={urbanist.className} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
