#

```zsh
# @involvex/gemini-cli-context
 ```

updates Gemini.md files for Gemini-cli .

## Getting Started

### Quick Start

```bash
# npx @involvex/gemini-cli-context@latest Gemini.md 
```

### Prerequisites

- Node.js
- npm

### Installation

```sh
npm install

```

## Project Structure

``` ps

├── .env
├── .prettierrc
├── dist
│   └── gemini-cli-context.cjs
├── eslint.config.js
├── Gemini.md
├── package-lock.json
├── package.json
├── README.md
└── src
    ├── config.js
    ├── index.js
    └── utils
        └── gemini.js

```

### Available Scripts

- `start`:
node src/index.js

- `lint`:
eslint .

- `lint:fix`:
eslint . --fix

- `format:check`:
prettier --check .

- `format`:
prettier --write .

- `prebuild`:
if not exist dist mkdir dist

- `build`:
esbuild src/index.js --bundle --platform=node --outfile=dist/gemini-cli-context.cjs

## AI Models Used

- **TEXT_ONLY**: `gemini-2.5-flash`
- **TEXT_AND_IMAGE**: `gemini-2.5-pro`

## Usage

To update the project context and generate `Gemini.md` (and optionally `README.md`), run the following command:

```sh
npm start
```

You will be prompted to provide a detailed project description and whether to update `README.md`.

## Configuration

This project uses the Google Gemini API. To use it, you can provide your API key in two ways:

### Option 1: Using a `.env` file (Recommended for security)

1. Obtain a Gemini API key from the [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Create a `.env` file in the root directory of this project.
3. Add your API key to the `.env` file:

``` .env
GEMINI_API_KEY=YOUR_API_KEY
```

Replace `YOUR_API_KEY` with your actual Gemini API key.

### Option 2: Passing as a command-line argument

You can also pass the API key directly when running the script:

```sh
npm start -- --apikey="YOUR_API_KEY"

```

Note the `--` before `--apikey` which is necessary to pass arguments to the Node.js script.

### Github-Repository

- [https://github.com/involvex/gemini-cli-context](https://github.com/involvex/gemini-cli-context)

## Support

- [Buy me a coffee](https://buymeacoffee.com/involvex)

```bash

#  Enjoy ! 

```
