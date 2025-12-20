import fg from "fast-glob";
import { buildDocumentation, documentationToMarkdown } from "tsdoc-markdown";
import fs from "fs/promises";
import path from "path";
import { getFolders } from "../utils/getFolders.ts";

const src = path.resolve(process.cwd(), "./src");
const output = path.resolve(process.cwd(), "./docs");

const getDocName = (name: string) => {
  switch (name) {
    case "arr":
      return "Arrays";
    case "css":
      return "CSS";
    case "date":
      return "Dates";
    case "dom":
      return "DOM";
    case "evt":
      return "DOM Events";
    case "json":
      return "JSON";
    case "fn":
      return "Functions";
    case "net":
      return "Network";
    case "num":
      return "Numbers";
    case "obj":
      return "Objects";
    case "str":
      return "Strings";
    case "user":
      return "User's browser";
    default:
      return name;
  }
};

const getCodeMarkdown = (string: string) => {
  return `\`\`\`ts
${string}
\`\`\``;
};

const getIndexMd = (content: string) => `# FlowerKit 🌸 API Reference\n___\n${content}\n\nDidn't find something? Contact the author, and we'll add it in the next release! 🔥`;

// Gets separated docs
const entities = await getFolders(src)
  .then((folders) => folders.map((folder) => {
    const docs = buildDocumentation({
      inputFiles: [
        fg.convertPathToPattern(path.join(src, `/${folder}/index.ts`)),
      ],
      options: {
        explore: true,
        types: false,
      },
    })
      .filter(({ fileName }) => {
        return fileName && fileName.includes(folder);
      });

    console.debug(`Created ${docs.length} entities for "${folder}"...`);
    return {
      name: folder,
      docs,
    };
  }));

// Write parts to file
await Promise.all(entities.map(({ name, docs }) => {
  return new Promise(async (resolve: (value: { name: string; link: string; }) => void, reject) => {
    const title = `# ⚙️ ${getDocName(name)} utils pack API`;
    const names = docs.map(({ name }) => name);
    const subtitle = `## Usage\n${getCodeMarkdown(`import { ${names.join(", ")} } from "@web3r/flowerkit/${name}";`)}`;

    // fix examples
    docs
      .map(({ jsDocs }) => jsDocs)
      .filter((entry) => !!entry)
      .forEach((entry) => {
        entry
          .filter((item) => item.name === "example")
          .map((item) => item.text)
          .forEach((example) => {
            if (example) {
              example[0].text = getCodeMarkdown(example[0].text);
            }
          });
      });

    const fileName = `${name}.md`;
    const md = documentationToMarkdown({
      entries: docs,
      options: {
        headingLevel: "##",
        emoji: null,
      },
    });
    const file = path.join(output, fileName);
    console.debug(`Generating docs for "${name}"...`);
    /* eslint-disable security/detect-non-literal-fs-filename */
    await fs.writeFile(file, `${title}\n___\n${subtitle}\n___\n${md}`)
      .then(() => {
        return resolve({
          name,
          link: `./${fileName}`,
        });
      }, reject);
  });
}))
  .then(async (links) => {
    console.debug(`Generating index...`);
    const refs = links
      .map(({ name, link }) => {
        return `- [${getDocName(name)}](${link})`;
      })
      .join(`\n`);
    return await fs.writeFile(path.join(output, "index.md"), getIndexMd(refs));
  })
  .then(() => {
    console.debug("Docs successfully written!");
    return process.exit(0);
  })
  .catch((err: unknown) => {
    console.error(err);
  });
