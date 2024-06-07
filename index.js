#!/usr/bin/env node

import inquirer from "inquirer";
import * as fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

import { createComponentFiles } from "./createComponents.js";

const CURR_DIR = process.cwd();
const __dirname = dirname(fileURLToPath(import.meta.url));
const templatePath = `${__dirname}/templates/React`;

const ALPHABETS_ONLY_REGEX = /^[A-Z][a-zA-Z]*$/;

const QUESTIONS = [
  {
    type: "input",
    name: "componentName",
    message: "Enter component name:",
    validate: function (input) {
      if (ALPHABETS_ONLY_REGEX.test(input)) return true;
      else
        return "Component name must start with a CAPITAL LETTER and can only include alphabets.";
    },
  },
  {
    type: "input",
    name: "filePath",
    message: "Where want to create this Component",
    default: "src/components/",
  },
  {
    type: "input",
    name: "template",
    message: "Do you want to choose typescript? (y/n):",
    default: "y",
  },
];

inquirer.prompt(QUESTIONS).then((answers) => {
  const { componentName, filePath, template } = answers;

  const isTypescript = template.toLowerCase() === "y";

  const destinationPath = `${CURR_DIR}/${filePath}/${componentName}`;

  try {
    // make directory if required
    fs.mkdirSync(destinationPath, { recursive: true });
  } catch (e) {
    console.log(e);
  }
  createComponentFiles(componentName, {
    templatePath,
    destinationPath,
    isTypescript,
  });
});
