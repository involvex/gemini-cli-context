/** @format */

import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';

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
    return;
  }

  const projectStructure = await getProjectStructure(rootDir);

  let repomixContent = '';
  try {
    repomixContent = await fs.readFile(path.join(rootDir, 'repomix-output.xml'), 'utf-8');
  } catch (error) {
    console.log('repomix-output.xml not found. Run `npm run bundle` to generate it.');
  }

  console.log(`
This is the project description from package.json: "${analysis.projectDescription}"
Please provide a more detailed description or press Enter to keep this one:`);
  const userClarification = await new Promise(resolve => process.stdin.once('data', resolve));

  const description = userClarification.toString().trim() || analysis.projectDescription;

  const newAnalysisMarkdownContent = generateAnalysisMarkdown(analysis, description, projectStructure, repomixContent);

  // Always overwrite the Gemini.md file with the new content
  await fs.writeFile(outputFilePath, newAnalysisMarkdownContent);
  console.log(`\n✅ ${outputFilename} has been successfully updated with a detailed analysis!`);

  console.log('\nDo you want to generate or update the README.md file as well? (y/n) ');
  const createReadme = await new Promise(resolve => process.stdin.once('data', resolve));

  if (createReadme.toString().trim().toLowerCase() === 'y') {
    const readmePath = path.join(rootDir, 'README.md');
    const newReadmeContent = generateReadmeContent(analysis, description, projectStructure);
    let existingReadmeContent = '';
    try {
      existingReadmeContent = await fs.readFile(readmePath, 'utf-8');
    } catch (error) {
      console.log(`README.md not found, creating a new one.`);
    }

    // Define the sections to be updated in README.md
    const sectionsToUpdateReadme = {
      '## Getting Started': newReadmeContent.match(/## Getting Started[\s\S]*?(?=## AI Models Used|## Usage|## Configuration|## Contributing|## License|$)/s)?.[0] || '',
      '## Project Structure': newReadmeContent.match(/## Project Structure[\s\S]*?(?=### Available Scripts|## AI Models Used|## Usage|## Configuration|## Contributing|## License|$)/s)?.[0] || '',
      '### Available Scripts': newReadmeContent.match(/### Available Scripts[\s\S]*?(?=## AI Models Used|## Usage|## Configuration|## Contributing|## License|$)/s)?.[0] || '',
      '## AI Models Used': newReadmeContent.match(/## AI Models Used[\s\S]*?(?=## Usage|## Configuration|## Contributing|## License|$)/s)?.[0] || '',
      '## Usage': newReadmeContent.match(/## Usage[\s\S]*?(?=## Configuration|## Contributing|## License|$)/s)?.[0] || '',
      '## Configuration': newReadmeContent.match(/## Configuration[\s\S]*?(?=## Contributing|## License|$)/s)?.[0] || '',
      '## Contributing': newReadmeContent.match(/## Contributing[\s\S]*?(?=## License|$)/s)?.[0] || '',
      '## License': newReadmeContent.match(/## License[\s\S]*?(?=$)/s)?.[0] || '',
    };

    let updatedReadmeContent = existingReadmeContent;
    if (!existingReadmeContent.includes(`# ${analysis.projectName}`)) {
      updatedReadmeContent = newReadmeContent; // If no existing project name, overwrite
    } else {
      // Update description separately as it's at the top
      const descriptionRegex = new RegExp(`^# ${analysis.projectName}\n([\s\S]*?)(?=\n##)`, 's');
      const newDescription = newReadmeContent.match(descriptionRegex)?.[1] || '';
      if (updatedReadmeContent.match(descriptionRegex)) {
        updatedReadmeContent = updatedReadmeContent.replace(descriptionRegex, `# ${analysis.projectName}\n${newDescription}`);
      } else {
        updatedReadmeContent = `# ${analysis.projectName}\n${newDescription}\n\n${updatedReadmeContent}`;
      }

      for (const sectionTitle in sectionsToUpdateReadme) {
        const newSectionContent = sectionsToUpdateReadme[sectionTitle];
        const sectionRegex = new RegExp(`${sectionTitle}[\s\S]*?(?=(## [A-Za-z]+|### [A-Za-z]+|$))`, 's');
        if (updatedReadmeContent.match(sectionRegex)) {
          updatedReadmeContent = updatedReadmeContent.replace(sectionRegex, newSectionContent);
        } else if (newSectionContent) {
          // If section doesn't exist, append it
          updatedReadmeContent += `\n\n${newSectionContent}`;
        }
      }
    }

    try {
      await fs.writeFile(readmePath, updatedReadmeContent);
      console.log('✅ README.md has been successfully updated!');
    } catch (error) {
      console.error('Error writing README.md:', error);
    }
  }
  process.stdin.destroy();
}

function generateAnalysisMarkdown(analysis, description, projectStructure, repomixContent) {
  const sections = [
    '# Project Context for Gemini',
    '',
    '## 1. Project Overview',
    `- **Project Name**: ${analysis.projectName}`,
    `- **Description**: ${description}`,
    `- **Entry Point**: 
${analysis.entryPoint}
`,
    '',
    '## 2. AI Models Used',
    ...(analysis.modelsUsed.length > 0
      ? analysis.modelsUsed.map(m => `- **${m.name}**: 
${m.value}
`)
      : ['No AI models specified.']),
    '',
    '## 3. Project Structure',
    '',
    '',
    '```',
    projectStructure,
    '```',
    '',
    '## 4. Scripts',
    'The following scripts are available via ',
    '`npm run <script_name>`:',
    ...analysis.scripts.map(s => `- **${s.name}**: 

${s.command}

`),
    '',
    '## 5. Dependencies',
    '### Main Dependencies',
    ...(analysis.dependencies.length > 0 ? analysis.dependencies.map(d => `- **${d.name}**: ${d.version}${d.isOutdated ? ` (outdated, latest: ${d.latestVersion})` : ''}`) : ['None']),
    '',
    '### Development Dependencies',
    ...(analysis.devDependencies.length > 0 ? analysis.devDependencies.map(d => `- **${d.name}**: ${d.version}${d.isOutdated ? ` (outdated, latest: ${d.latestVersion})` : ''}`) : ['None']),
    '',
    '## 6. Recommendations',
    ...(analysis.recommendations.length > 0 ? analysis.recommendations.map(r => `- ${r}`) : ['No specific recommendations at this time.']),
    '',
    '## 7. Suggested TODO List',
    ...(analysis.todoList.length > 0 ? analysis.todoList.map(t => `- ${t}`) : ['No immediate TODOs suggested.'])
  ];

  if (repomixContent) {
    sections.push(
      '',
      '## 8. Bundled Project (repomix)',
      '```xml',
      repomixContent,
      '```'
    );
  }

  return sections.join('\n');
}

function generateReadmeContent(analysis, description, projectStructure) {
  return [
    `# ${analysis.projectName}`,
    description,
    '',
    '## Getting Started',
    '',
    '### Prerequisites',
    '- Node.js',
    '- npm',
    '',
    '### Installation',
    '',
    '```sh',
    'npm install',
    '',
    '```',
    '',
    '## Project Structure',
    '',
    '```',
    projectStructure,
    '```',
    '',
    '### Available Scripts',
    ...analysis.scripts.map(s => `- 
${s.name}
 : 
${s.command}

`),
    '',
    '## AI Models Used',
    ...(analysis.modelsUsed.length > 0
      ? analysis.modelsUsed.map(m => `- **${m.name}**: 
${m.value}
`)
      : ['No AI models specified.']),
    '',
    '## Usage',
    'To update the project context and generate `Gemini.md` (and optionally `README.md`), run the following command:',
    '',
    '```sh',
    'npm start',
    '```',
    '',
    'You will be prompted to provide a detailed project description and whether to update `README.md`.',
    '',
        '## Configuration',
        'This project uses the Google Gemini API. To use it, you can provide your API key in two ways:',
        '',
        '### Option 1: Using a `.env` file (Recommended for security)',
        '1. Obtain a Gemini API key from the [Google AI Studio](https://aistudio.google.com/app/apikey).',
        '2. Create a `.env` file in the root directory of this project.',
        '3. Add your API key to the `.env` file:',
        '```',
        'GEMINI_API_KEY=YOUR_API_KEY',
        '```',
        'Replace `YOUR_API_KEY` with your actual Gemini API key.',
        '',
        '### Option 2: Passing as a command-line argument',
        'You can also pass the API key directly when running the script:',
        '```sh',
        'npm start -- --apikey="YOUR_API_KEY"',
        '```',
        'Note the `--` before `--apikey` which is necessary to pass arguments to the Node.js script.',
        '',
        '## Contributing',
    'Contributions are welcome! Please feel free to submit a Pull Request.',
    '',
    '## License',
    'This project is licensed under the MIT License.'
  ].join('\n');
}

updateProjectContext();
