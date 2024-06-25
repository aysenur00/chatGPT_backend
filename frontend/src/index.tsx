import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { ClerkProvider } from '@clerk/clerk-react'
import { dark, neobrutalism, shadesOfPurple } from '@clerk/themes';

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing publishable key")
}
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ClerkProvider
    publishableKey={PUBLISHABLE_KEY}
    appearance={{
      variables: { colorPrimary: '#08f808' },
      baseTheme: dark
    }}
  >
    <MantineProvider defaultColorScheme="dark">
        <App />
    </MantineProvider>
  </ClerkProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
