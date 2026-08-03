import fg from "fast-glob";
import { lint } from "markdownlint/promise";
import { buildDocumentation, documentationToMarkdown } from "tsdoc-markdown";
import ts from "typescript";
import fs from "fs/promises";
import path from "path";
import { getFolders } from "../utils/index.ts";

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

const getIndexMd = (content: string) => `# FlowerKit 🌸 API Reference\n\n___\n\n${content}\n\nDidn't find something? Contact the author, and we'll add it in the next release! 🔥\n`;

const getPublicExportNames = async (folder: string): Promise<Set<string>> => {
  const indexFile = path.join(src, folder, "index.ts");
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const source = await fs.readFile(indexFile, "utf8");
  // eslint-disable-next-line security/detect-unsafe-regex
  const exportBlocks = [ ...source.matchAll(/export\s+(?:type\s+)?\{([^}]+)\}\s+from/g) ];
  const names = exportBlocks.flatMap(([ , block ]) => {
    return block
      .split(",")
      .map((name) => name.trim().split(/\s+as\s+/).at(-1) ?? "")
      .filter(Boolean);
  });
  return new Set(names);
};

type TMarkdownValidationOptions = {
  expectedFunctions?: string[];
  expectedLinks?: string[];
  name: string;
};

const getMatchesCount = (value: string, search: string): number => {
  return value.split(search).length - 1;
};

const validateMarkdownStyle = async (markdown: string, name: string): Promise<void> => {
  const results = await lint({
    config: {
      default: true,
      MD004: false,
      MD012: { maximum: 3 },
      MD013: false,
    },
    strings: { [name]: markdown },
  });
  const errors = results[name] ?? [];
  if (errors.length > 0) {
    const details = errors
      .map(({
        errorContext, errorDetail, lineNumber, ruleNames,
      }) => {
        const context = errorDetail ?? errorContext ?? "";
        return `${name}:${lineNumber} ${ruleNames[0]}${context ? ` ${context}` : ""}`;
      })
      .join("\n");
    throw new Error(`docs: ${name}: markdownlint validation failed:\n${details}`);
  }
};

const validateTypeScript = (code: string, context: string): void => {
  const result = ts.transpileModule(`${code}\nexport {};`, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ESNext,
    },
    fileName: `${context}.ts`,
    reportDiagnostics: true,
  });
  const errors = (result.diagnostics ?? []).filter(({ category }) => category === ts.DiagnosticCategory.Error);
  if (errors.length > 0) {
    const details = errors
      .map(({ messageText }) => ts.flattenDiagnosticMessageText(messageText, " "))
      .join("; ");
    throw new Error(`docs: ${context}: invalid TypeScript example: ${details}`);
  }
};

const validateMarkdown = async (
  markdown: string,
  {
    expectedFunctions = [],
    expectedLinks = [],
    name,
  }: TMarkdownValidationOptions
): Promise<void> => {
  await validateMarkdownStyle(markdown, name);

  if (markdown.includes("\uFFFD")) {
    throw new Error(`docs: ${name}: contains invalid replacement characters`);
  }

  const h1Headings = markdown.match(/^# .+$/gm) ?? [];
  if (h1Headings.length !== 1 || !markdown.startsWith(`${h1Headings[0]}\n`)) {
    throw new Error(`docs: ${name}: must start with exactly one level-one heading`);
  }

  const fenceLines = markdown.match(/^```.*$/gm) ?? [];
  const codeBlocks = [ ...markdown.matchAll(/^```([^\r\n]*)\r?\n([\s\S]*?)^```[ \t]*$/gm) ];
  if (fenceLines.length % 2 !== 0 || codeBlocks.length * 2 !== fenceLines.length) {
    throw new Error(`docs: ${name}: contains an unclosed or malformed code fence`);
  }

  codeBlocks.forEach((match, index) => {
    const language = match[1].trim().toLowerCase();
    const code = match[2].trim();
    if (!code) {
      throw new Error(`docs: ${name}: code block ${index + 1} is empty`);
    }
    if (language === "ts" || language === "typescript") {
      validateTypeScript(code, `${name}:code-block-${index + 1}`);
    }
  });

  if (expectedFunctions.length > 0) {
    if (!markdown.includes("## Usage\n") || !markdown.includes("## Functions\n")) {
      throw new Error(`docs: ${name}: must contain Usage and Functions sections`);
    }
    if (new Set(expectedFunctions).size !== expectedFunctions.length) {
      throw new Error(`docs: ${name}: contains duplicate function entities`);
    }
  }

  expectedFunctions.forEach((functionName) => {
    const heading = `### ${functionName}`;
    if (getMatchesCount(markdown, `${heading}\n`) !== 1) {
      throw new Error(`docs: ${name}: expected exactly one heading for ${functionName}`);
    }
    const anchor = `- [${functionName}](#${functionName.toLowerCase()})`;
    if (getMatchesCount(markdown, anchor) !== 1) {
      throw new Error(`docs: ${name}: missing or duplicate anchor for ${functionName}`);
    }

    const sectionStart = markdown.indexOf(`${heading}\n`);
    const nextSectionStart = markdown.indexOf("\n### ", sectionStart + heading.length);
    const section = markdown.slice(sectionStart, nextSectionStart === -1 ? undefined : nextSectionStart);
    const examples = [ ...section.matchAll(/^```(?:ts|typescript)\r?\n[\s\S]*?^```[ \t]*$/gm) ];
    if (examples.length < 2) {
      throw new Error(`docs: ${name}: ${functionName} must contain at least two TypeScript examples`);
    }
  });

  expectedLinks.forEach((link) => {
    if (getMatchesCount(markdown, `](${link})`) !== 1) {
      throw new Error(`docs: ${name}: missing or duplicate link ${link}`);
    }
  });
};

// Gets separated docs
const folders = await getFolders(src);
const entities = await Promise.all(folders.map(async (folder) => {
  const publicExportNames = await getPublicExportNames(folder);
  const docs = buildDocumentation({
    inputFiles: [
      fg.convertPathToPattern(path.join(src, `/${folder}/index.ts`)),
    ],
    options: {
      explore: true,
      types: true,
    },
  })
    .filter(({ fileName, name }) => {
      return fileName && fileName.includes(folder) && publicExportNames.has(name);
    });

  const documentedNames = new Set(docs.map(({ name }) => name));
  const missingNames = [ ...publicExportNames ].filter((name) => !documentedNames.has(name));
  if (missingNames.length > 0) {
    throw new Error(`docs: ${folder}: public exports are missing from documentation: ${missingNames.join(", ")}`);
  }

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
    const importNames = docs.map(({ name }) => name);

    const functions = importNames.filter((name) => !name.startsWith("T"));
    const types = importNames.filter((name) => name.startsWith("T"));

    const subtitle = `## Usage\n\n${getCodeMarkdown(`// import functions\nimport { ${functions.join(", ")} } from "@web3r/flowerkit/${name}";\n\n// import types\nimport type { ${types.join(", ")} } from "@web3r/flowerkit/${name}";`)}`;

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
    })
      .replace(/(^```[ \t]*$)\r?\n(?=^```(?:ts|typescript)[ \t]*$)/gm, "$1\n\n")
      .replace(/\n{3,}(?=## Types\n)/g, "\n\n")
      .trimEnd();
    const file = path.join(output, fileName);
    const markdown = `${title}\n\n___\n\n${subtitle}\n\n___\n\n${md}\n`;
    await validateMarkdown(markdown, {
      expectedFunctions: functions,
      name: fileName,
    });
    console.debug(`Generating docs for "${name}"...`);
    /* eslint-disable security/detect-non-literal-fs-filename */
    await fs.writeFile(file, markdown)
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
    const indexMd = getIndexMd(refs);
    await validateMarkdown(indexMd, {
      expectedLinks: links.map(({ link }) => link),
      name: "index.md",
    });
    return await fs.writeFile(path.join(output, "index.md"), indexMd);
  })
  .then(() => console.debug("Docs successfully written!"))
  .catch((err: unknown) => {
    console.error(err);
    process.exitCode = 1;
  });
