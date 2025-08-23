import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cookies, headers } from "next/headers";
import ClientSidebar from "@/component/client/ClientSidebar";
import ClientNavbar from "@/component/client/ClientNavbar";
import ClientTokenHandler from "@/component/client/ClientTokenHandler";
import "@fortawesome/fontawesome-svg-core/styles.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ERP App",
  description: "ERP with Next.js 15 and NestJS",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ambil path route sekarang
  const pathname = (await headers()).get("x-invoke-path") ?? "/";
  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  let isLoggedIn = false;

  // hanya cek cookies kalau bukan halaman auth
  if (!isAuthPage) {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    isLoggedIn = allCookies.some((c) => c.name === "access_token");
  }

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="w-full min-h-screen font-sans bg-gray-100 text-gray-900">
        {isLoggedIn && !isAuthPage ? (
          <>
            <ClientSidebar />
            <div className="ml-58 min-h-screen flex flex-col">
              <ClientNavbar />
              <ClientTokenHandler />
              <main className="flex-grow p-6 bg-blue-50">{children}</main>
            </div>
          </>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
