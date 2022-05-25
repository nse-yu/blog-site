import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ResourceProvider from './components/ResourceProvider';

const root = ReactDOM.createRoot(document.getElementById('top_root'));
root.render(
  <React.StrictMode>
    <ResourceProvider>
      <App />
    </ResourceProvider>
  </React.StrictMode>
);
