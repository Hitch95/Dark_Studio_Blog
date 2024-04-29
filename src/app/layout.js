/* You're using `next/head` inside the `app` directory, please migrate to the Metadata API. 
   See https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#step-3-migrating-nexthead 
   for more details. 
*/
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "../context/ThemeContext";
import { UserProvider } from "../context/UserContext";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import AuthProvider from "../components/AuthProvider/AuthProvider";
import "./globals.css";

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
        <SpeedInsights />
        <ThemeProvider>
          <AuthProvider>
            <UserProvider>
              <div className="container">
                <Navbar />
                {children}
                <Footer />
              </div>
              <Toaster position="top-center" reverseOrder={false} toastOptions={{
                duration: 5000,
                success: {
                  style: {
                    backgroundColor: '#53c28b',
                    color: 'white',
                  },
                  iconTheme: {
                    primary: 'white',
                    secondary: '#53c28b',
                  },
                }
              }} />
            </UserProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}