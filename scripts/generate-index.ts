import * as fs from "fs";
import * as path from "path";

function generateIndexForDir(dirPath: string) {
  const files = fs.readdirSync(dirPath, { withFileTypes: true });

  const exportStatements: string[] = [];

  for (const file of files) {
    if (file.name === "index.ts") continue;

    const fullPath = path.join(dirPath, file.name);
    const relativePath = `./${file.name.replace(/\.ts$/, "")}`;

    if (file.isFile() && file.name.endsWith(".ts")) {
      exportStatements.push(`export * from "${relativePath}";`);
    }

    if (file.isDirectory()) {
      generateIndexForDir(fullPath);
    }
  }

  if (exportStatements.length > 0) {
    const indexPath = path.join(dirPath, "index.ts");
    fs.writeFileSync(indexPath, exportStatements.join("\n") + "\n");
    console.log(`✅ Created: ${indexPath}`);
  }
}

const baseDir = path.resolve(__dirname, "src"); // hoặc đường dẫn bạn muốn quét
generateIndexForDir(baseDir);
