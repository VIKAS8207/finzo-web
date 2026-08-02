import type { Metadata } from "next";
import { Source_Serif_4, Play } from "next/font/google";
import "./globals.css";

// Path to your components
import Navbar from "@/components/layout/Navbar"; 
import Footer from "@/components/layout/Footer"; // Imported the Footer

// Setting up standard fonts
const serif4 = Source_Serif_4({ 
  subsets: ["latin"], 
  variable: "--font-serif" 
});

// Import and configure the Play font
const playFont = Play({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-play', // This CSS variable is picked up by globals.css
});

export const metadata: Metadata = {
  title: "Finzo Web - High Performance Financial Systems",
  description: "Enterprise software solutions from Vikas Vishwakarma.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Injected playFont.variable here
    <html lang="en" className={`${playFont.variable} ${serif4.variable} antialiased`}>
      {/* Added flex column layout to manage the Footer positioning */}
      {/* FIX: Moved suppressHydrationWarning OUTSIDE of the className string */}
      <body className="font-sans min-h-screen bg-[#050505] text-white flex flex-col" suppressHydrationWarning>
        
        {/* The persistent Navbar */}
        <Navbar />
        
        {/* Main Content Area (flex-grow pushes the footer to the bottom) */}
        <main className="w-full flex flex-col items-center flex-grow">
          {children}
        </main>

        {/* The persistent Footer */}
        <Footer />
        
      </body>
    </html>
  );
}