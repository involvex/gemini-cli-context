# Project Context for Gemini

## 1. Project Overview
- **Project Name**: @involvex/gemini-cli-context
- **Description**: updates Gemini.md files for Gemini-cli .
- **Entry Point**: 
src/index.js


## 2. AI Models Used
- **TEXT_ONLY**: `gemini-2.5-flash`
- **TEXT_AND_IMAGE**: `gemini-2.5-pro`

## 3. Project Structure


```
├── .env
├── .gitignore
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

## 4. Scripts
The following scripts are available via 
npm run <script_name>
':
- **start**: 

node src/index.js


- **lint**: 

eslint .


- **lint:fix**: 

eslint . --fix


- **format:check**: 

prettier --check .


- **format**: 

prettier --write .


- **prebuild**: 

if not exist dist mkdir dist


- **build**: 

esbuild src/index.js --bundle --platform=node --outfile=dist/gemini-cli-context.cjs



## 5. Dependencies
### Main Dependencies
- **@google/generative-ai**: ^0.1.3 (outdated, latest: 0.24.1)
- **axios**: ^1.12.2
- **dotenv**: ^16.6.1 (outdated, latest: 17.2.2)

### Development Dependencies
- **esbuild**: ^0.25.10
- **eslint**: ^8.57.1 (outdated, latest: 9.36.0)
- **eslint-config-prettier**: ^9.1.2 (outdated, latest: 10.1.8)
- **globals**: ^15.15.0 (outdated, latest: 16.4.0)
- **prettier**: ^3.6.2

## 6. Recommendations
- Some dependencies are outdated. Consider running `npm update`.
- No "test" script found. It is recommended to add a testing framework (e.g., Jest, Mocha) to ensure code quality.
- Consider adding a "check" script that runs both linting and formatting for a single quality gate.

## 7. Suggested TODO List
- [ ] Update outdated dependencies to their latest versions.
- [ ] Implement a testing strategy and add a "test" script.
- [ ] Create a unified "check" script for code quality.

## 1. Project Overview
- **Project Name**: @involvex/gemini-cli-context
- **Description**: updates Gemini.md files for Gemini-cli .
- **Entry Point**: 
src/index.js




## 2. AI Models Used
- **TEXT_ONLY**: 
gemini-2.5-flash

- **TEXT_AND_IMAGE**: 
gemini-2.5-pro




## 3. Project Structure


```
├── .env
├── .github
│   └── FUNDING.yml
├── .gitignore
├── .prettierrc
├── dist
│   └── gemini-cli-context.cjs
├── eslint.config.js
├── Gemini.md
├── package-lock.json
├── package.json
├── README.md
├── repomix-output.xml
└── src
    ├── config.js
    ├── index.js
    └── utils
        └── gemini.js

```



## 4. Scripts
The following scripts are available via 
`npm run <script_name>`:
- **start**: 

node src/index.js


- **lint**: 

eslint .


- **lint:fix**: 

eslint . --fix


- **format:check**: 

prettier --check .


- **format**: 

prettier --write .


- **prebuild**: 

if not exist dist mkdir dist


- **build**: 

esbuild src/index.js --bundle --platform=node --banner:js="#!/usr/bin/env node" --outfile=dist/gemini-cli-context.cjs


- **bundle**: 

repomix


- **postbundle**: 

echo 'Project bundled into a single file using repomix. You can find the output in the project root.'





## 5. Dependencies
### Main Dependencies
- **@google/generative-ai**: ^0.1.3 (outdated, latest: 0.24.1)
- **axios**: ^1.12.2
- **dotenv**: ^16.6.1 (outdated, latest: 17.2.2)

### Development Dependencies
- **esbuild**: ^0.25.10
- **eslint**: ^8.57.1 (outdated, latest: 9.36.0)
- **eslint-config-prettier**: ^9.1.2 (outdated, latest: 10.1.8)
- **globals**: ^15.15.0 (outdated, latest: 16.4.0)
- **prettier**: ^3.6.2
- **repomix**: ^1.6.0



## 6. Recommendations
- Some dependencies are outdated. Consider running `npm update`.
- No "test" script found. It is recommended to add a testing framework (e.g., Jest, Mocha) to ensure code quality.
- Consider adding a "check" script that runs both linting and formatting for a single quality gate.



## 7. Suggested TODO List
- [ ] Update outdated dependencies to their latest versions.
- [ ] Implement a testing strategy and add a "test" script.
- [ ] Create a unified "check" script for code quality.



## 8. Bundled Project (repomix)
```xml
This file is a merged representation of the entire codebase, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
.github/FUNDING.yml
.gitignore
.prettierrc
eslint.config.js
Gemini.md
package.json
README.md
src/config.js
src/index.js
src/utils/gemini.js
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path=".github/FUNDING.yml">
# @format

buy_me_a_coffee: involvex
</file>

<file path=".gitignore">
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# Diagnostic reports (https://nodejs.org/api/report.html)
report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage
*.lcov

# nyc test coverage
.nyc_output

# Grunt intermediate storage (https://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (https://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules/
jspm_packages/

# Snowpack dependency directory (https://snowpack.dev/)
web_modules/

# TypeScript cache
*.tsbuildinfo

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional stylelint cache
.stylelintcache

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variable files
.env
.env.*
!.env.example

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next
out

# Nuxt.js build / generate output
.nuxt
dist
.output

# Gatsby files
.cache/
# Comment in the public line in if your project uses Gatsby and not Next.js
# https://nextjs.org/blog/next-9-1#public-directory-support
# public

# vuepress build output
.vuepress/dist

# vuepress v2.x temp and cache directory
.temp
.cache

# Sveltekit cache directory
.svelte-kit/

# vitepress build output
**/.vitepress/dist

# vitepress cache directory
**/.vitepress/cache

# Docusaurus cache and generated files
.docusaurus

# Serverless directories
.serverless/

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# Firebase cache directory
.firebase/

# TernJS port file
.tern-port

# Stores VSCode versions used for testing VSCode extensions
.vscode-test

# yarn v3
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions

# Vite files
vite.config.js.timestamp-*
vite.config.ts.timestamp-*
.vite/
</file>

<file path=".prettierrc">
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all"
}
</file>

<file path="eslint.config.js">
import js from "@eslint/js";
import globals from "globals";
import prettierConfig from 'eslint-config-prettier';

export default [
  {languageOptions: { globals: { ...globals.node, ...globals.browser } }},
  js.configs.recommended,
  prettierConfig,

];
</file>

<file path="src/config.js">
/** @format */

import dotenv from 'dotenv'
dotenv.config()

function getApiKey() {
  const apiKeyArg = process.argv.find(arg => arg.startsWith('--apikey='));
  if (apiKeyArg) {
    return apiKeyArg.split('=')[1];
  }
  return process.env.GEMINI_API_KEY;
}

export const GEMINI_API_KEY = getApiKey();

export const MODELS = {
  TEXT_ONLY: 'gemini-2.5-flash',
  TEXT_AND_IMAGE: 'gemini-2.5-pro',
  // Add other models as they become available
}

export const DEFAULT_MODEL = MODELS.TEXT_ONLY

export function getModel(type = DEFAULT_MODEL) {
  if (!Object.values(MODELS).includes(type)) {
    console.warn(`Model type "${type}" not recognized. Using default model: ${DEFAULT_MODEL}`)
    return DEFAULT_MODEL
  }
  return type
}
</file>

<file path="src/index.js">
/** @format */

import fs from 'fs/promises';
import path from 'path';
import readline from 'readline';
import { exec } from 'child_process';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise(resolve => {
    rl.question(query, resolve);
  });
}

const IGNORED_DIRS = ['node_modules', '.git', '.vscode'];

async function getProjectStructure(dir, prefix = '') {
  let structure = '';
  try {
    const files = await fs.readdir(dir, { withFileTypes: true });
    const filteredFiles = files.filter(file => !IGNORED_DIRS.includes(file.name));

    for (let i = 0; i < filteredFiles.length; i++) {
      const file = filteredFiles[i];
      const connector = i === filteredFiles.length - 1 ? '└── ' : '├── ';
      structure += `${prefix}${connector}${file.name}\n`;
      if (file.isDirectory()) {
        const newPrefix = prefix + (i === filteredFiles.length - 1 ? '    ' : '│   ');
        structure += await getProjectStructure(path.join(dir, file.name), newPrefix);
      }
    }
  } catch (error) {
    // Ignore errors
  }
  return structure;
}

function runCommand(command) {
  return new Promise(resolve => {
    exec(command, (error, stdout, stderr) => {
      if (error || stderr) {
        resolve(null); // Resolve with null if there's an error
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

async function analyzeProject() {
  console.log('Reading package.json...');
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  let packageJson;
  try {
    const fileContent = await fs.readFile(packageJsonPath, 'utf-8');
    packageJson = JSON.parse(fileContent);
  } catch (error) {
    console.error('Could not read or parse package.json. Analysis cannot continue.');
    return null;
  }

  const { dependencies, devDependencies, scripts, main } = packageJson;
  const analysis = {
    dependencies: [],
    devDependencies: [],
    scripts: [],
    entryPoint: main || 'Not specified',
    recommendations: [],
    todoList: [],
    projectName: packageJson.name || path.basename(process.cwd()),
    projectDescription: packageJson.description || '',
    modelsUsed: [],
  };

  console.log('Analyzing dependencies...');
  const outdatedDeps = [];
  const analyzeDep = async (deps, type) => {
    if (!deps) return;
    for (const [name, version] of Object.entries(deps)) {
      const latestVersion = await runCommand(`npm view ${name} version`);
      const isOutdated = latestVersion && latestVersion !== version.replace(/["^~]/, '');
      const depInfo = { name, version, latestVersion: latestVersion || 'N/A', isOutdated: !!isOutdated };
      analysis[type].push(depInfo);
      if (isOutdated) outdatedDeps.push(depInfo);
    }
  };

  await Promise.all([
      analyzeDep(dependencies, 'dependencies'),
      analyzeDep(devDependencies, 'devDependencies')
  ]);

  console.log('Analyzing scripts...');
  if (scripts) {
    analysis.scripts = Object.entries(scripts).map(([name, command]) => ({ name, command }));
  }

  // Generate recommendations and TODOs
  if (outdatedDeps.length > 0) {
    analysis.recommendations.push('Some dependencies are outdated. Consider running `npm update`.');
    analysis.todoList.push('[ ] Update outdated dependencies to their latest versions.');
  }
  if (!scripts || !scripts.test) {
    analysis.recommendations.push('No "test" script found. It is recommended to add a testing framework (e.g., Jest, Mocha) to ensure code quality.');
    analysis.todoList.push('[ ] Implement a testing strategy and add a "test" script.');
  }
  if (scripts && scripts.lint && scripts['format'] && !scripts['check']) {
      analysis.recommendations.push('Consider adding a "check" script that runs both linting and formatting for a single quality gate.');
      analysis.todoList.push('[ ] Create a unified "check" script for code quality.');
  }

  // Add models used to analysis
    const modelConfigPath = path.join(process.cwd(), 'src', 'config.js');
    try {
      const modelConfigFileContent = await fs.readFile(modelConfigPath, 'utf-8');
      const modelRegex = /export\s+const\s+MODELS\s*=\s*{([^}]+)}/s;
      const match = modelConfigFileContent.match(modelRegex);
      if (match && match[1]) {
        const modelsContent = match[1];
        const modelEntries = modelsContent.split('\n')
                                        .map(line => line.trim())
                                        .filter(line => line.length > 0 && !line.startsWith('//')); // Filter out comments and empty lines
        analysis.modelsUsed = modelEntries.map(entry => {
          const parts = entry.split(':');
          if (parts.length < 2) {
            console.warn(`Skipping malformed model entry: ${entry}`);
            return null; // Return null for malformed entries
          }
          return {
            name: parts[0].trim(),
            value: parts[1].trim().replace(/['",]/g, '') // Also remove trailing commas
          };
        }).filter(Boolean); // Filter out null entries
      } else {
        console.warn('Could not parse models from src/config.js.');
      }
    } catch (error) {
      console.error('Error reading or parsing src/config.js:', error);
    }

  return analysis;
}

async function updateProjectContext() {
  console.log('Starting advanced project context update...');

  const rootDir = process.cwd();
  const outputFilename = process.argv[2] || 'Gemini.md';
  const outputFilePath = path.join(rootDir, outputFilename);

  const analysis = await analyzeProject();
  if (!analysis) {
    rl.close();
    return;
  }

  const projectStructure = await getProjectStructure(rootDir);

  const userClarification = await question(
    `
This is the project description from package.json: "${analysis.projectDescription}"
Please provide a more detailed description or press Enter to keep this one:
`
  );
  const description = userClarification || analysis.projectDescription;

  const newAnalysisMarkdownContent = generateAnalysisMarkdown(analysis, description, projectStructure);
  let existingGeminiMdContent = '';
  try {
    existingGeminiMdContent = await fs.readFile(outputFilePath, 'utf-8');
  } catch (error) {
    // If file doesn't exist, treat as empty
    console.log(`${outputFilename} not found, creating a new one.`);
  }

  // Define the sections to be updated in Gemini.md
  const sectionsToUpdateGemini = {
    '