import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Mohammad Rajiullah - Senior Lecturer in Computer Science",
    template: "%s | Mohammad Rajiullah"
  },
  description: "Research portfolio of Mohammad Rajiullah, focusing on low-latency networking, web performance, and next-generation mobile technologies at Karlstad University.",
  keywords: ["computer science", "5G", "6G", "networking", "research", "academic", "Karlstad University"],
  authors: [{ name: "Mohammad Rajiullah" }],
  creator: "Mohammad Rajiullah",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    siteName: "Mohammad Rajiullah",
    title: "Mohammad Rajiullah - Senior Lecturer in Computer Science",
    description: "Research portfolio focusing on low-latency networking, web performance, and next-generation mobile technologies.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Crimson+Pro:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#FFFFFF" />
      </head>
      <body className="antialiased bg-white text-gray-900">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
