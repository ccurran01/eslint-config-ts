# eslint-config-ts

Shareable ESLint config for use in TypeScript projects, supporting both legacy ESLint configs (v8.x) and the new flat config format (v9.x+).

## Why?
Rather than having to copy linter config files across code repos of the same project/tech stack, you can pull in a standard shared config and dependencies from a single place and manage any changes/updates centrally.

## Features
- **Modular Configuration**: Choose base config + environment-specific extensions
- **Environment Support**: Node.js, Browser, and Universal configurations  
- **Testing Framework Support**: Jest and Vitest variants available
- **Dual Format Support**: Both ESLint v9+ flat config and legacy v8 formats
- **TypeScript First**: Optimized for modern TypeScript projects

## Rules
This config uses:
- **TypeScript ESLint recommended rules**: https://github.com/typescript-eslint/typescript-eslint
- **Stylistic formatting rules**: https://github.com/eslint-stylistic/eslint-stylistic  
- **Security rules**: https://github.com/eslint-community/eslint-plugin-security
- **Import/export rules**: https://github.com/import-js/eslint-plugin-import
- **Modern JavaScript practices**: https://github.com/sindresorhus/eslint-plugin-unicorn
- **Jest testing rules**: https://github.com/jest-community/eslint-plugin-jest

Environment-specific globals and rules are only included when you explicitly choose the relevant variant.

## Prerequisites
- **Node.js** >= 18.0.0
- **npm** >= 7.x.x or **yarn** >= 1.22.x

## Dependencies
This package requires the following peer dependencies (automatically installed if not present):

```
eslint ^9.39.0
@typescript-eslint/eslint-plugin ^8.54.0
@typescript-eslint/parser ^8.54.0
@stylistic/eslint-plugin ^2.x.x
eslint-plugin-import ^2.31.0
eslint-plugin-jest ^28.10.0
eslint-plugin-security ^3.0.1
eslint-plugin-unicorn ^56.x.x
typescript >=4.5.0
```

## Usage

### For ESLint v9+ (Flat Config - Recommended)

1. Install the config in your project:
```bash
npm install --save-dev @dvsa/eslint-config-ts
```

2. Create an `eslint.config.js` file in your project root with your preferred variant:

#### Base Configuration (Universal)
```javascript
import dvsaConfig from '@dvsa/eslint-config-ts/flat';

export default dvsaConfig;
```

#### Node.js Projects
```javascript
import dvsaConfig from '@dvsa/eslint-config-ts/flat';

// Option 1: Use pre-configured Node.js variant
export default dvsaConfig.node;

// Option 2: Combine manually for more control
export default [
  ...dvsaConfig,
  // Add Node.js-specific config
];
```

#### Browser Projects  
```javascript
import dvsaConfig from '@dvsa/eslint-config-ts/flat';

export default dvsaConfig.browser;
```

#### With Testing Frameworks
```javascript
import dvsaConfig from '@dvsa/eslint-config-ts/flat';

// Jest
export default dvsaConfig.jest;

// Combined: Node.js + Jest (common combination)
export default [
  ...dvsaConfig.node,
  ...dvsaConfig.jest,
];
```

3. Add scripts to your `package.json`:
```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

### For ESLint v8.x (Legacy Config)

1. Install the config in your project:
```bash
npm install --save-dev @dvsa/eslint-config-ts
```

2. Create a `.eslintrc.json` file in your project root:

#### Base Configuration (Universal)
```json
{
  "extends": "@dvsa/eslint-config-ts"
}
```

#### Environment-Specific Variants
```json
{
  "extends": "@dvsa/eslint-config-ts/node"
}
```

```json
{
  "extends": "@dvsa/eslint-config-ts/browser"  
}
```

```json
{
  "extends": "@dvsa/eslint-config-ts/jest"
}
```

3. Add scripts to your `package.json`:
```json
{
  "scripts": {
    "lint": "eslint --ext .js,.ts .",
    "lint:fix": "eslint --ext .js,.ts . --fix"
  }
}
```

## Available Configurations

### Flat Config (ESLint v9+)
- `@dvsa/eslint-config-ts/flat` - Base universal configuration
- `@dvsa/eslint-config-ts/flat.node` - Includes Node.js globals and environment  
- `@dvsa/eslint-config-ts/flat.browser` - Includes browser globals and environment
- `@dvsa/eslint-config-ts/flat.jest` - Includes Jest testing configuration

### Legacy Config (ESLint v8.x)  
- `@dvsa/eslint-config-ts` - Base universal configuration
- `@dvsa/eslint-config-ts/node` - Includes Node.js environment
- `@dvsa/eslint-config-ts/browser` - Includes browser environment
- `@dvsa/eslint-config-ts/jest` - Includes Jest testing configuration

## Configuration

### ESLint Ignore
Add a `.eslintignore` file to specify project directories/files to exclude from linting:
```
node_modules/
dist/
build/
coverage/
*.d.ts
```

### TypeScript Configuration
Ensure you have a `tsconfig.json` file in your project root, as this config uses type-aware linting rules.

## Running the Linter

```bash
# Run linting
npm run lint

# Fix auto-fixable issues
npm run lint:fix
```

## IDE Integration
For VS Code, install the ESLint extension to see lint issues as you type. Consider adding a pre-commit hook using tools like `husky` and `lint-staged` to run the linter before commits.

## Migration from v3.x to v4.x

### Breaking Changes in v4.0
- **Modular Configuration**: Configs are now modular by environment and testing framework
- **No Default Environment Assumptions**: Base config no longer assumes Node.js or Jest
- **Removed Airbnb Dependencies**: Replaced with @stylistic and unicorn plugins  
- **Updated Dependencies**: All dependencies updated to latest stable versions
- **Node.js 18+ Required**: Dropped support for older Node.js versions

### Migration Steps

#### Step 1: Choose Your Configuration Strategy

**Before (v3.x):**
```javascript
// Flat config
import dvsaConfig from '@dvsa/eslint-config-ts/flat';
export default dvsaConfig;

// Legacy config  
{ "extends": "@dvsa/eslint-config-ts" }
```

**After (v4.x) - Choose based on your environment:**

**For Node.js + Jest projects (most common):**
```javascript
// Flat config
import dvsaConfig from '@dvsa/eslint-config-ts/flat';
export default [
  ...dvsaConfig.node,
  ...dvsaConfig.jest,
];

// Legacy config
{ "extends": "@dvsa/eslint-config-ts/jest" }  // Jest variant includes Node.js
```

**For browser projects:**
```javascript
// Flat config
export default dvsaConfig.browser;

// Legacy config
{ "extends": "@dvsa/eslint-config-ts/browser" }
```

**For universal/library projects:**
```javascript
// Flat config
export default dvsaConfig; // Base config with no environment assumptions

// Legacy config  
{ "extends": "@dvsa/eslint-config-ts" } // Base config
```

#### Step 2: Update Dependencies
```bash
npm install --save-dev @dvsa/eslint-config-ts@^4.0.0
```

#### Step 3: Review Custom Rules
Some rules may have changed due to the Airbnb → Stylistic/Unicorn migration. Check your custom overrides against the new rule set.

#### Step 4: Test Your Configuration
```bash
npm run lint
```

### What Changed Under the Hood
- **Airbnb → @stylistic**: Style rules now come from @stylistic plugin instead of Airbnb
- **Added Unicorn Plugin**: Modern JavaScript best practices
- **Modular Environments**: Environment-specific globals moved to variants  
- **Test Framework Agnostic**: Base config doesn't assume Jest

## Development Notes
When making changes to this package, you cannot use `npm link` to test locally due to peer dependency limitations. Consider using `npm pack` and installing the generated tarball for testing.

---
*This shared config was originally created by the FTTS (Future Theory Test Service) team for use across TypeScript/Node.js projects using Jest for testing.*
