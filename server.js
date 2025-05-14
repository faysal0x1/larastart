const { createServer } = require('http')
const { createInertiaApp } = require('@inertiajs/react/server')
const { resolvePageComponent } = require('laravel-vite-plugin/inertia-helpers')
const appName = 'My App'

createServer((req, res) => {
    createInertiaApp({
        page: req.url,
        render: async (page) => {
            const { head, body } = await page.render();
            return `<!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
            ${head}
          </head>
          <body>
            ${body}
          </body>
        </html>`;
        },
        resolve: (name) => resolvePageComponent(`./resources/js/Pages/${name}.jsx`, import.meta.glob('./resources/js/Pages/**/*.jsx')),
        setup: ({ App, props }) => <App {...props} />,
    });
}).listen(13714)