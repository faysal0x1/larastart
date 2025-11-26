import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import serviceWorkerManager from './utils/serviceWorker';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { route } from 'ziggy-js';
import { Ziggy } from './ziggy';

// Initialize Echo for Reverb
// window.Pusher = Pusher;

// window.Echo = new Echo({
//     broadcaster: 'reverb',
//     key: import.meta.env.VITE_REVERB_APP_KEY,
//     wsHost: window.location.hostname, // Will use 'microjobsite.test'
//     wsPort: 8080,
//     wssPort: 8080,
//     forceTLS: false, // Disable in local development
//     enabledTransports: ['ws', 'wss'],
// });

const appName = import.meta.env.VITE_APP_NAME || 'tbz';

if (typeof window !== 'undefined') {
    window.Ziggy = Ziggy;
    window.route = (name, params, absolute, config = Ziggy) =>
        route(name, params, absolute, config);
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.jsx`, import.meta.glob('./pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);

        // Initialize service worker with Inertia props
        if (props.serviceWorker) {
            serviceWorkerManager.init(props);
            serviceWorkerManager.register().then(() => {
                // Send config to service worker after registration
                serviceWorkerManager.sendConfigToWorker();
            });
        }
    },
    progress: {
        color: '#4B5563',
    },
});

// Set light/dark mode on load
initializeTheme();
