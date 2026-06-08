import * as path from 'node:path';
import { defineConfig } from '@rspress/core';
import { transformerCodeBlockMarker } from './docs/theme/codeblock-marker';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'My Site',
  icon: '/rspress-icon.png',
  logo: {
    light: '/rspress-light-logo.png',
    dark: '/rspress-dark-logo.png',
  },
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/web-infra-dev/rspress',
      },
    ],
  },
  // Warm theme: global styles for CSS variable overrides
  globalStyles: path.join(__dirname, 'docs/theme/warm-theme.css'),
  // Warm theme: custom component that extends the appearance switch to 3 states
  globalUIComponents: [
    path.join(__dirname, 'docs/theme/AppearanceSwitch.tsx'),
  ],
  // Markdown: add shiki transformer for good/bad code block markers
  markdown: {
    shiki: {
      transformers: [transformerCodeBlockMarker()],
    },
  },
});
