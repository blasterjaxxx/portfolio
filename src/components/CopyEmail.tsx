"use client";

import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button
      onClick={copy}
      className="text-muted hover:text-accent transition-colors cursor-pointer"
      aria-label={`Copy email address ${email}`}
    >
      {copied ? "copied ✓" : email}
    </button>
  );
}
