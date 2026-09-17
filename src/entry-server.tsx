import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

// Used by scripts/prerender.js to bake the app's markup into build/index.html.
export function render(): string {
  return renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
