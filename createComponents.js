import * as fs from "fs";
import { basename, extname } from "path";

export const createComponentFiles = (componentName, options) => {
  const { destinationPath, templatePath } = options;

  try {
    const filesToCreate = fs.readdirSync(templatePath);

    // loop through every file
    for (const file of filesToCreate) {
      const origFilePath = `${templatePath}/${file}`;

      // get file extension
      const extension = extname(origFilePath);

      //get file name without extension
      const fileName = basename(origFilePath, extension);

      const newFileName = fileName.replace("Component", componentName);

      const contents = fs.readFileSync(origFilePath, "utf8");
      let updatedContent = contents.replace(/Component/g, componentName);

      const writePath = `${destinationPath}/${newFileName}${extension}`;

      fs.writeFileSync(writePath, updatedContent, "utf8");
    }
  } catch (error) {
    console.log(
      "\n\nOops..! That was unexpected !!😨\nHelp me by raising an issue 🩵"
    );
  }
};
