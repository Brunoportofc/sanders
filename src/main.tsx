import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/chat-animations.css'
import { ThemeProvider } from 'next-themes'

// Suprimir avisos específicos do UnicornStudio no console
const originalError = console.error;
console.error = (...args) => {
  // Filtrar erros do UnicornStudio/Curtains que são seguros para ignorar
  if (
    args[0]?.includes?.('Curtains instance is not valid') ||
    args[0]?.includes?.('renderFrame') ||
    (typeof args[0] === 'string' && args[0].includes('unicornStudio'))
  ) {
    return;
  }
  originalError.apply(console, args);
};

createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
    <App />
  </ThemeProvider>
);
