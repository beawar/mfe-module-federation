import { createRoot } from 'react-dom/client';
import { App } from './App';

// Render your React component instead
const element = document.getElementById('root');
if (element) {
    const root = createRoot(element);
    root.render(<App />);
}