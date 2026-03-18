import { Inter } from "next/font/google";
import "./globals.css";

// Load a clean, modern, high-end tech font
const inter = Inter({ subsets: ["latin"] });

// This is your digital business card. It tells Google and iOS exactly what your site is.
export const metadata = {
  title: "Artificium | Enterprise AI Consulting",
  description: "Bespoke AI solutions, automated workflows, and corporate AI training built by Southwest Florida's premier AI-native tech firm.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* The antialiased class ensures the text looks razor-sharp on Mac Retina displays */}
      <body className={`${inter.className} antialiased bg-slate-950 text-slate-50`}>
        {children}
      </body>
    </html>
  );
}