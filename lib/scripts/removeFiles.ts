import { readFile, unlink, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { getFiles } from "../utils/index.ts";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const dist = path.resolve(__dirname, "../../dist");

// Rewrites relative declaration imports, e.g. "./x.ts" -> "./x.d.mts".
const rewriteDeclImportsToMts = (content: string): string => content
  .replace(
    /(["'`])((?:\.{1,2}\/)[^"'`]+?)(?:\.d\.ts|\.d\.mts|\.ts|\.mts)\1/g,
    "$1$2.d.mts$1"
  );

await getFiles(dist, (file: string) => file.endsWith(".d.ts"))
  .then(async (list) => {
    const items = list.map(async (item: string) => {
      const content = await readFile(item, "utf8");
      await writeFile(item.replace(/\.d\.ts$/, ".d.mts"), content, "utf8");
    });
    return await Promise.all(items);
  })
  .then(async () => await getFiles(dist, (file: string) => file.endsWith(".d.mts")))
  .then(async (list) => {
    const items = list.map(async (item: string) => {
      const content = await readFile(item, "utf8");
      const output = rewriteDeclImportsToMts(content);
      if (output !== content) {
        await writeFile(item, output, "utf8");
      }
    });
    return await Promise.all(items);
  })
  .then(async () => await getFiles(dist, (file: string) => file.endsWith(".d.ts")))
  .then(async (list) => {
    const items = list.map(async (item: string) => {
      await unlink(item);
    });
    return await Promise.all(items);
  })
  .then(() => {
    console.debug("[RemoveFilesPlugin] Declarations rewritten and .d.ts files removed");
    return true;
  });
