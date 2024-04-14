import { Head } from "next/head";
import Navbar from "../components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "../components/footer/Footer";
import { ThemeProvider } from "../context/ThemeContext";
import { UserProvider } from "../context/UserContext";
import AuthProvider from "../components/AuthProvider/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Dark Studio Blog",
    template: "%s - Dark Studio Blog",
  },
  description: "The media for digital pros",
  openGraph: {
    title: 'Next.js',
    description: 'The media for digital pros',
    url: 'http://localhost:3000/',
    siteName: 'Next.js',
    images: [
      {
        url: 'http://localhost:3000/api/og?title=DarkStudioBlog', // Dynamic og route
        width: 800,
        height: 600,
      },
      {
        url: 'http://localhost:3000/api/og?title=DarkStudioBlog', // Dynamic og route
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <UserProvider>
              <div className="container">
                <Navbar />
                {children}
                <Footer />
              </div>
            </UserProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}