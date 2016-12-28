#!usr/bin/env/node

import { FileNameTree } from './dependency-tree';
import * as Imports from './import-parser';
import * as path from 'path';
import * as fs from 'fs';
import { uniqueOnly, concat } from './utils';
import * as cli from 'commander';

const createOutput = (entrypoint: string) => {
    const dependencyTree = new FileNameTree();
    const allDeps = Imports.crawlFiles(entrypoint, Imports.freemarker)
    dependencyTree.setRoot(allDeps);

    const output = dependencyTree.uniques()
        .map(filename => fs.readFileSync(filename, 'utf8'))
        .map(file => {
            return Imports.freemarkerImports(file).reduce((file, statement) => file.replace(statement, ''), file);
        })
        .reduce(concat);

    return output
};

const saveOutput = (outputObj: {}, outputPath: string) => {
    Object.keys(outputObj).forEach(filepath => {
        const p = path.parse(filepath);
        fs.writeFileSync(path.resolve(outputPath, p.name + p.ext), outputObj[filepath]);
    })
};

export const bundle = (entrypoints: string[], outputFolder: string) => {
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
        bundle(entries, path.resolve(process.cwd(), outputPath));
    })
    .parse(process.argv);