#!usr/bin/env/node
"use strict";
const dependency_tree_1 = require("./dependency-tree");
const Imports = require("./import-parser");
const path = require("path");
const fs = require("fs");
const utils_1 = require("./utils");
const cli = require("commander");
const createOutput = (entrypoint) => {
    const dependencyTree = new dependency_tree_1.FileNameTree();
    const allDeps = Imports.crawlFiles(entrypoint, Imports.freemarker);
    dependencyTree.setRoot(allDeps);
    const output = dependencyTree.uniques()
        .map(filename => fs.readFileSync(filename, 'utf8'))
        .map(file => {
        return Imports.freemarkerImports(file).reduce((file, statement) => file.replace(statement, ''), file);
    })
        .reduce(utils_1.concat);
    return output;
};
const saveOutput = (outputObj, outputPath) => {
    Object.keys(outputObj).forEach(filepath => {
        const p = path.parse(filepath);
        fs.writeFileSync(path.resolve(outputPath, p.name + p.ext), outputObj[filepath]);
    });
};
exports.bundle = (entrypoints, outputFolder) => {
    const output = entrypoints.reduce((obj, entry) => {
        obj[entry] = createOutput(entry);
        return obj;
    }, {});
    saveOutput(output, outputFolder);
    return Promise.resolve(true);
};
cli
    .version('0.1.0')
    .usage('<output> <entrypoint> [rest...]')
    .option('--debug', 'Debug mode, prints dependency tree for inspection')
    .option('-o, --output', 'Folder for the outputed files')
    .action((outputPath, entry, ...args) => {
    const entries = [entry].concat(args.filter(a => typeof a === 'string')).map(entry => path.resolve(process.cwd(), entry));
    exports.bundle(entries, path.resolve(process.cwd(), outputPath));
})
    .parse(process.argv);
