import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ConvexClientProvider} from "@/providers/convex-client-provider";
import {Toaster} from "@/components/ui/sonner";
import {ModelProvider} from "@/providers/model-provider";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Board App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          <Toaster />
          <ModelProvider />
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
