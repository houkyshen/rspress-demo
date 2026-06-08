/**
 * Shiki transformer that detects `good` or `bad` keywords in the
 * code block meta string and adds a CSS class to the wrapper.
 *
 * Usage in markdown:
 *   ```js good     → green left border
 *   ```js bad      → red left border
 *   ```js          → no special border
 */
export function transformerCodeBlockMarker() {
  return {
    name: 'shiki-transformer:codeblock-marker',
    pre(pre: any) {
      const meta: string = this.options.meta?.__raw || '';
      let markerClass = '';

      if (/\bgood\b/.test(meta)) {
        markerClass = 'rp-codeblock--good';
      } else if (/\bbad\b/.test(meta)) {
        markerClass = 'rp-codeblock--bad';
      }

      if (markerClass) {
        const existing: string =
          pre.properties?.containerElementClassName || '';
        pre.properties = {
          ...pre.properties,
          containerElementClassName: [existing, markerClass]
            .filter(Boolean)
            .join(' '),
        };
      }
      return pre;
    },
  };
}
