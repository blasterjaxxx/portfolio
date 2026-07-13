import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import { TerminalBackground } from "@/components/TerminalBackground";
import { profile } from "@/lib/content";

const mono = JetBrains_Mono({
  variable: "--font-mono-stack",
  subsets: ["latin"],
});

const sans = Inter({
  variable: "--font-sans-stack",
  subsets: ["latin"],
});

const description =
  "Backend engineer with 6 years in distributed systems, now building AI-native systems — agentic tooling, multi-pass LLM pipelines, and RAG assistants with LangChain and LangGraph.";

export const metadata: Metadata = {
  title: `${profile.name} — Backend & AI Engineer`,
  description,
  openGraph: {
    title: `${profile.name} — Backend & AI Engineer`,
    description,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Backend & AI Engineer`,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${mono.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TerminalBackground />
        <div className="relative z-10 flex flex-1 flex-col">{children}</div>
      </body>
    </html>
  );
}
