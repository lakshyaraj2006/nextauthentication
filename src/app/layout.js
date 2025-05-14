import { Karla } from "next/font/google";
import "./globals.css";

const karla = Karla({ subsets: ["latin"] });

export const metadata = {
  title: "Home | NextJS Authentication",
  description: "Authentication tutorial using nextjs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${karla.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
