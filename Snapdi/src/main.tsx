import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Filter out Chrome extension errors and Ant Design warnings in development
if (import.meta.env.DEV) {
  const originalError = console.error;
  const originalWarn = console.warn;

  console.error = (...args) => {
    const message = args[0]?.toString() || '';

    // Filter out Chrome extension errors and Ant Design React 19 warnings
    const filterPatterns = [
      'chrome-extension://',
      'net::ERR_FILE_NOT_FOUND',
      'SecretSessionError',
      'GetLoginNames4URL',
      'background.js',
      'extensionState.js',
      'antd v5 support React is 16 ~ 18',
      '[antd: compatible]'
    ];

    const shouldFilter = filterPatterns.some(pattern =>
      message.includes(pattern)
    );

    if (shouldFilter) {
      return;
    }

    originalError.apply(console, args);
  };

  console.warn = (...args) => {
    const message = args[0]?.toString() || '';

    // Filter Ant Design React compatibility warnings
    const warnFilterPatterns = [
      'antd v5 support React is 16 ~ 18',
      '[antd: compatible]',
      'see https://u.ant.design/v5-for-19'
    ];

    const shouldFilter = warnFilterPatterns.some(pattern =>
      message.includes(pattern)
    );

    if (shouldFilter) {
      return;
    }

    originalWarn.apply(console, args);
  };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
