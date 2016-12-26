import { Tree, Node } from './dependency-tree';
import * as Imports from './import-parser';
import * as path from 'path';
import { uniqueOnly } from './utils';
import {reverse} from "dns";

const dependencyTree = new Tree<string>();

// TEST NODES
const rootNode = new Node<string>('a');
const node1_1 = new Node<string>('-b1');
const node1_2 = new Node<string>('-b2');
const node2_1 = new Node<string>('--c1');
const node2_2 = new Node<string>('--c2');

rootNode.connect(node1_1);
rootNode.connect(node1_2);
node1_1.connect(node2_1);
node1_1.connect(node2_2);
node1_2.connect(node2_1);

dependencyTree.setRoot(rootNode);
console.log(JSON.stringify(dependencyTree.uniques(), null, 4));

// TEST FILE
const testFile = `
    [#import a.ftl]
    [#import b.ftl]
    
    [#function moi]
        [#return]
        
        [#import c.ftl]
    [/#function]

`;

const allDeps = Imports.crawlFiles(path.resolve(__dirname, '../src/test/freemarker/entry.ftl'), Imports.freemarker)
    .filter(uniqueOnly)
    .reverse()
    .map(file => {
        return Imports.freemarkerImports(file).reduce((file, statement) => file.replace(statement, ''), file);
    })

console.log(Imports.concatFiles(allDeps));