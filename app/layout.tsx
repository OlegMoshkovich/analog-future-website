import type { Metadata } from "next";
import { SiteMotion } from "@/components/site/site-motion";
import "./globals.css";
import "./motion.css";

export const metadata: Metadata = {
  title: "Analog Future | Design & Product Studio",
  description:
    "Analog Future is an independent studio creating brand systems, digital products, and visual communication.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var id=location.hash.slice(1);if((location.pathname!=="/"&&location.pathname!=="")||(id!=="studio"&&id!=="work"&&id!=="approach"&&id!=="contact"))return;document.documentElement.style.scrollBehavior="auto";history.scrollRestoration="manual";})();`,
          }}
        />
        {children}
        <SiteMotion />
      </body>
    </html>
  );
}
