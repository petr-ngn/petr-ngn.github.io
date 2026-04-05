import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root') as HTMLElement;

// Progressive-enhancement HTML in public/index.html puts a `.static-content` shell
// inside #root. That DOM does not match <App />, so hydrating it throws. Only
// hydrate when the tree is real react-snap / React output (no manual shell).
const hasManualStaticShell =
  rootElement.querySelector(':scope > .static-content') !== null;

if (rootElement.hasChildNodes() && !hasManualStaticShell) {
  ReactDOM.hydrateRoot(
    rootElement,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  if (hasManualStaticShell) {
    rootElement.innerHTML = '';
  }
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
