import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Shell } from "@/components/layout/Shell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HireSync | Candidate Pipeline Dashboard",
  description: "A modern, enterprise-grade candidate pipeline dashboard for recruiters to effortlessly track, manage, and engage top talent.",
  keywords: ["recruitment dashboard", "candidate pipeline", "ATS", "applicant tracking system", "HR tech"],
  authors: [{ name: "Siddharth Chauhan" }],
  openGraph: {
    title: "HireSync Dashboard",
    description: "Manage your recruitment pipeline efficiently with HireSync.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HireSync Recruitment Dashboard",
    description: "Enterprise candidate pipeline tracking.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
