import * as fs from "fs";
import { basename, extname } from "path";

export const createComponentFiles = (componentName, options) => {
  const { destinationPath, templatePath, isTypescript } = options;

  try {
    const filesToCreate = fs.readdirSync(templatePath);

    // loop through every file
    for (const file of filesToCreate) {
      //  Skip creation of types file in js template
      if (!isTypescript && fileName === "Component.types") {
        continue;
      }

      const origFilePath = `${templatePath}/${file}`;

      // get file extension
      const extension = extname(origFilePath);

      // .tsx => .jsx & .ts => .js
      const newExtension = isTypescript
        ? extension
        : extension.replace("t", "j");

      //get file name without extension
      const fileName = basename(origFilePath, extension);

      const newFileName = fileName.replace("Component", componentName);

      const contents = fs.readFileSync(origFilePath, "utf8");
      let updatedContent = contents.replace(/Component/g, componentName);

      if (!isTypescript && fileName === "index") {
        const lines = updatedContent.split("\n");
        // remove types import in line 2 for js template
        lines.splice(1, 1);
        updatedContent = lines.join("\n");
      }

      const writePath = `${destinationPath}/${newFileName}.${newExtension}`;

      fs.writeFileSync(writePath, updatedContent, "utf8");
    }
  } catch (error) {
    console.log(e);
  }
};
