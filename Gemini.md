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