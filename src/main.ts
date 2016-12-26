import { FileNameTree } from './dependency-tree';
import * as Imports from './import-parser';
import * as path from 'path';
import * as fs from 'fs';
import { uniqueOnly, concat } from './utils';

const dependencyTree = new FileNameTree();

const allDeps = Imports.crawlFiles(path.resolve(__dirname, '../src/test/freemarker/entry.ftl'), Imports.freemarker)
dependencyTree.setRoot(allDeps);
const output = dependencyTree.uniques()
    .filter(uniqueOnly)
    .map(filename => fs.readFileSync(filename, 'utf8'))
    .map(file => {
        return Imports.freemarkerImports(file).reduce((file, statement) => file.replace(statement, ''), file);
    })
    .reduce(concat);