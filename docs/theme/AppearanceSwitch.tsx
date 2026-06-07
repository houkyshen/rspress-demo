import { useContext, useEffect, useCallback, useRef } from 'react';
import { ThemeContext } from '@rspress/core/runtime';

const WARM_STORAGE_KEY = 'rspress-theme-warm';

/**
 * Invisible component that extends the existing light/dark SwitchAppearance
 * to support a 3-state cycle: Light → Dark → Warm → Light.
 *
 * It intercepts clicks on `.rp-switch-appearance` in the capture phase,
 * manages a custom `rp-warm` class on `<html>`, and keeps rspress's
 * internal ThemeContext in sync.
 */
export default function AppearanceSwitch() {
  const { theme, setTheme } = useContext(ThemeContext);
  const warmRef = useRef(false);

  /* ---- Determine current effective mode ---- */
  const getMode = useCallback((): 'light' | 'dark' | 'warm' => {
    if (warmRef.current) return 'warm';
    return document.documentElement.classList.contains('rp-dark') ? 'dark' : 'light';
  }, []);

  /* ---- Apply warm class to DOM and persist ---- */
  const applyWarm = useCallback(
    (enable: boolean) => {
      const html = document.documentElement;
      warmRef.current = enable;

      if (enable) {
        // Ensure dark mode is off — warm is light-only
        if (html.classList.contains('rp-dark')) {
          setTheme('light');
        }
        html.classList.add('rp-warm');
        localStorage.setItem(WARM_STORAGE_KEY, 'true');
      } else {
        html.classList.remove('rp-warm');
        localStorage.setItem(WARM_STORAGE_KEY, 'false');
      }
    },
    [setTheme],
  );

  /* ---- Restore warm state on mount ---- */
  useEffect(() => {
    const stored = localStorage.getItem(WARM_STORAGE_KEY);
    if (stored === 'true') {
      applyWarm(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---- Intercept clicks on SwitchAppearance ---- */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(
        '.rp-switch-appearance',
      );
      if (!target) return;

      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      const mode = getMode();

      if (mode === 'light') {
        // Light → Dark
        applyWarm(false);
        setTheme('dark');
      } else if (mode === 'dark') {
        // Dark → Warm
        setTheme('light');
        applyWarm(true);
      } else {
        // Warm → Light
        applyWarm(false);
        // theme stays 'light'
      }
    };

    document.addEventListener('click', handler, true);
    return () => document.removeEventListener('click', handler, true);
  }, [theme, setTheme, getMode, applyWarm]);

  /* ---- Guard: prevent rp-dark and rp-warm from coexisting ---- */
  useEffect(() => {
    if (warmRef.current && document.documentElement.classList.contains('rp-dark')) {
      // Something unexpectedly added rp-dark — force back to light
      document.documentElement.classList.remove('rp-dark', 'dark');
    }
  }, [theme]);

  // This component renders nothing visually
  return null;
}
