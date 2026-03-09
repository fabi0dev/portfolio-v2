'use client';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { useTheme } from '@/hooks/useTheme';
import Home from '@/modules/public/Home';

export default function Page() {
  useTheme();

  return (
    <>
      <Home />
      <SpeedInsights />
    </>
  );
}

