# SVG Image Extractor

A free, open-source web tool to extract embedded images (PNG, JPEG, GIF, WebP) from SVG files. 100% client-side processing - your files never leave your browser.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Tests](https://img.shields.io/badge/tests-60%20passing-brightgreen)

## Features

✨ **Three Input Methods**
- 📁 Upload SVG files (up to 10MB)
- 🔗 Import from URL
- 📋 Paste SVG code directly

📦 **ZIP Download**
- Download all images as a single ZIP file
- Progress tracking during ZIP generation

🎯 **Format Support**
- PNG, JPEG, GIF, WebP
- Automatic format detection

🔒 **Privacy First**
- 100% client-side processing
- No server uploads
- No tracking or analytics

⚡ **Modern Tech Stack**
- Astro 5.16
- Tailwind CSS v4
- JSZip for ZIP generation
- Vitest for testing (60 tests, 100% passing)

## Quick Start

```bash
# Clone the repository
git clone https://github.com/yasinmiran/svg-image-extractor.git
cd svg-image-extractor

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## Development

### Prerequisites

- Node.js 18+
- npm 8+

### Project Structure

```
svg-image-extractor/
├── src/
│   ├── components/       # Astro components
│   ├── layouts/          # Page layouts
│   ├── lib/              # Core business logic
│   ├── constants/        # Constants and messages
│   ├── pages/            # Astro pages
│   └── styles/           # CSS files
├── tests/
│   ├── unit/             # Unit tests
│   └── integration/      # Integration tests
└── public/               # Static assets
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run test suite
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Generate coverage report

## Architecture

The project follows a modular architecture with clear separation of concerns:

- **Components**: Reusable UI components (tabs, grid, etc.)
- **Lib**: Pure business logic (extraction, validation, ZIP generation)
- **Constants**: Centralized messages and configuration
- **Tests**: Comprehensive test coverage (60 tests)

For detailed architecture documentation, see [ARCHITECTURE.md](./ARCHITECTURE.md).

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Quick Contribution Guide

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass (`npm test`)
6. Commit changes (`git commit -m 'Add amazing feature'`)
7. Push to branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## Testing

All features are thoroughly tested:

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run in watch mode
npm test -- --watch
```

Current test coverage: 60 tests passing

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

MIT License - see [LICENSE](./LICENSE) for details.

## Acknowledgments

- Built with [Astro](https://astro.build)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- ZIP generation by [JSZip](https://stuk.github.io/jszip/)
- Testing with [Vitest](https://vitest.dev)

## Support

- 🐛 [Report a bug](https://github.com/yasinmiran/svg-image-extractor/issues)
- 💡 [Request a feature](https://github.com/yasinmiran/svg-image-extractor/issues)
- 📖 [Read the docs](./ARCHITECTURE.md)

---

Made with ❤️ by the community
