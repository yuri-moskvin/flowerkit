import { unlink } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getFiles } from "../utils/getFiles.ts";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const dist = path.resolve(__dirname, "../../dist");

await getFiles(dist, ((file: string) => file.endsWith(".d.ts"))
)
  .then(async (list) => {
    const items = list.map((item: string) => new Promise((resolve: (value: void) => void, reject) => {
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      unlink(item, (err) => !!err ? reject() : resolve());
    }));
    return Promise.all(items);
  })
  .then(() => {
    console.debug("[RemoveFilesPlugin] Files removed");
    return true;
  });
