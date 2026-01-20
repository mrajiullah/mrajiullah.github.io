'use client';

import { ThemeProvider } from '@/lib/theme-provider';

export function Providers({
  children,
  industry
}: {
  children: React.ReactNode;
  industry?: string;
}) {
  return (
    <ThemeProvider industry={industry}>
      {children}
    </ThemeProvider>
  );
}
