# Contributing to SVG Image Extractor

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yasinmiran/svg-image-extractor.git`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/your-feature-name`

## Development Workflow

### 1. Make Your Changes

- Keep changes focused and atomic
- Follow the existing code style
- Add JSDoc comments to new functions
- Update tests for changed functionality

### 2. Write Tests

- All new features must include tests
- Aim for >80% code coverage
- Place unit tests in `tests/unit/`
- Run tests: `npm test`

### 3. Follow Code Style

**JavaScript/TypeScript:**
- Use meaningful variable names
- Keep functions small (<50 lines)
- Add JSDoc comments for all exports
- Use const/let, never var

**Components:**
- Keep components under 150 lines
- Use descriptive prop types
- Add component-level comments

**CSS:**
- Use Tailwind utilities where possible
- Custom CSS only when necessary
- Mobile-first responsive design

### 4. Commit Guidelines

Use conventional commits format:

```
type(scope): description

[optional body]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding/updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(zip): add progress tracking for ZIP generation
fix(validator): handle edge case in URL validation
docs(readme): update installation instructions
```

### 5. Submit Pull Request

1. Push your changes: `git push origin feature/your-feature-name`
2. Open a Pull Request on GitHub
3. Fill out the PR template
4. Wait for review

## Pull Request Guidelines

### Before Submitting

- ✅ All tests pass (`npm test`)
- ✅ Build succeeds (`npm run build`)
- ✅ Code follows style guidelines
- ✅ New features have tests
- ✅ Documentation is updated

### PR Description

Include:
- **What**: Summary of changes
- **Why**: Reason for changes
- **How**: Implementation approach
- **Testing**: How you tested the changes

### Review Process

1. Maintainer reviews code
2. Feedback addressed in new commits
3. Once approved, PR is merged
4. Your contribution is celebrated! 🎉

## Project Structure

```
src/
├── components/       # Astro UI components
├── layouts/          # Page layouts
├── lib/              # Business logic (pure functions)
│   ├── svgExtractor.js
│   ├── zipGenerator.js
│   └── ...
├── constants/        # Constants and messages
├── pages/            # Astro pages
└── styles/           # CSS files

tests/
├── unit/             # Unit tests for lib/
├── integration/      # Integration tests
└── fixtures/         # Test fixtures
```

## Code Organization Principles

1. **Single Responsibility**: Each file does one thing
2. **Pure Functions**: Lib functions have no side effects
3. **DRY**: Don't repeat yourself
4. **Testability**: Write testable code

## Testing Guidelines

### Unit Tests

```javascript
import { describe, it, expect } from 'vitest';
import { functionToTest } from '../../src/lib/module.js';

describe('moduleName', () => {
  describe('functionToTest', () => {
    it('should handle valid input', () => {
      const result = functionToTest('valid-input');
      expect(result).toBe(expected);
    });

    it('should throw on invalid input', () => {
      expect(() => functionToTest('invalid')).toThrow();
    });
  });
});
```

### Test Coverage

- Aim for >80% coverage
- Test happy paths and edge cases
- Test error conditions
- Mock external dependencies

## Documentation

### JSDoc Comments

```javascript
/**
 * Brief description of function
 *
 * Detailed explanation of what it does and why.
 *
 * @param {type} paramName - Parameter description
 * @returns {type} Return value description
 * @throws {ErrorType} When it throws
 *
 * @example
 * const result = myFunction(input);
 */
export function myFunction(paramName) {
  // Implementation
}
```

### Component Comments

```astro
---
/**
 * Component description
 *
 * Explain what this component does and how to use it.
 *
 * @component
 */
---
```

## Common Tasks

### Adding a New Feature

1. Create feature branch
2. Write tests first (TDD)
3. Implement feature
4. Ensure tests pass
5. Update documentation
6. Submit PR

### Fixing a Bug

1. Write test that reproduces bug
2. Fix the bug
3. Ensure test passes
4. Submit PR with test + fix

### Adding a New Library Module

1. Create `src/lib/newModule.js`
2. Add JSDoc comments
3. Create `tests/unit/newModule.test.js`
4. Ensure >80% coverage
5. Update documentation

## Getting Help

- 💬 [GitHub Discussions](https://github.com/yasinmiran/svg-image-extractor/discussions)
- 🐛 [Issues](https://github.com/yasinmiran/svg-image-extractor/issues)

## Code of Conduct

Be respectful, inclusive, and constructive. See [CODE_OF_CONDUCT.md](./.github/CODE_OF_CONDUCT.md) for details.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🙏
