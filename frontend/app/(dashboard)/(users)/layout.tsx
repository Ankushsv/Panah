import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Landing - Updated",
  description: "A modern landing page built with Next.js + TypeScript + Tailwind.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className="bg-white text-gray-900">
      {children}
    </body>
  );
}
