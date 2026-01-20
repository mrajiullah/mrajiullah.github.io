'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeConfig, getIndustryTheme, generateThemeCSS } from '@/lib/industry-themes';

interface ThemeContextType {
  theme: ThemeConfig;
  setIndustry: (industry: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  industry
}: {
  children: React.ReactNode;
  industry?: string;
}) {
  const [theme, setTheme] = useState<ThemeConfig>(() => getIndustryTheme(industry));

  const setIndustry = (newIndustry: string) => {
    const newTheme = getIndustryTheme(newIndustry);
    setTheme(newTheme);
  };

  useEffect(() => {
    // Inject theme CSS variables
    const styleId = 'bizmaster-theme-vars';
    let styleEl = document.getElementById(styleId) as HTMLStyleElement;

    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }

    styleEl.textContent = generateThemeCSS(theme);

    // Load Google Fonts dynamically
    const fontLinkId = 'bizmaster-theme-fonts';
    let fontLink = document.getElementById(fontLinkId) as HTMLLinkElement;

    if (!fontLink) {
      fontLink = document.createElement('link');
      fontLink.id = fontLinkId;
      fontLink.rel = 'stylesheet';
      document.head.appendChild(fontLink);
    }

    const headingFont = theme.fonts.heading.split(',')[0].trim().replace(/'/g, '');
    const bodyFont = theme.fonts.body.split(',')[0].trim().replace(/'/g, '');
    const fonts = [headingFont, bodyFont].filter((f, i, arr) => arr.indexOf(f) === i);
    fontLink.href = `https://fonts.googleapis.com/css2?${fonts.map(f => `family=${f.replace(' ', '+')}:wght@400;500;600;700`).join('&')}&display=swap`;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setIndustry }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
