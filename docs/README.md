# Larastart Documentation

This is the documentation site for Larastart - A powerful Laravel React starter kit.

## Features

- **Static Documentation**: Built with React and Vite for fast loading
- **Responsive Design**: Works on desktop and mobile devices
- **Search Functionality**: Easy navigation and search
- **Code Examples**: Syntax-highlighted code snippets
- **Modern UI**: Clean and professional design

## Getting Started

### Prerequisites

- Node.js 18 or higher
- Bun (recommended) or npm

### Installation

1. Install dependencies:
```bash
bun install
```

2. Start development server:
```bash
bun run dev
```

3. Open your browser and navigate to `http://localhost:3001`

### Building for Production

```bash
bun run build
```

The built files will be in the `dist` directory.

## Documentation Structure

- **Home**: Overview of Larastart features
- **Getting Started**: Installation and setup guide
- **Commands**: Artisan command documentation
- **Components**: React component library
- **Helpers**: PHP and JavaScript helper functions
- **Models**: Eloquent model documentation
- **Controllers**: HTTP controller documentation
- **Services**: Service layer documentation
- **Repositories**: Repository pattern documentation
- **Middleware**: HTTP middleware documentation
- **Utils**: Utility functions documentation

## Customization

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add the route to `src/App.jsx`
3. Add navigation item to `src/components/Layout.jsx`

### Styling

The documentation uses Tailwind CSS for styling. You can customize the design by modifying:

- `src/index.css` - Global styles
- `tailwind.config.js` - Tailwind configuration
- Component-specific styles in each component

### Content

All documentation content is written in JSX components. You can easily update or add new content by editing the component files.

## Deployment

The documentation can be deployed to any static hosting service:

- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your repository and deploy
- **GitHub Pages**: Use GitHub Actions to build and deploy
- **AWS S3**: Upload the `dist` folder to an S3 bucket

## Contributing

To contribute to the documentation:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This documentation is part of the Larastart project and follows the same license.
