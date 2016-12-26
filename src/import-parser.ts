import * as fs from 'fs';
import * as path from 'path';
import { Node, Tree, INode } from './dependency-tree'

export interface ImportParser {
    (file: string): string[]
}

export interface DependencyCrawler {
    (entrypoint: string, parse: ImportParser): string[];
}

const freemarkerGetFileName = (importStatement: string): string => {
    return importStatement
        .replace(/\[#import\s+/, '')
        .replace(/\s*\]/, '');
};

export const freemarkerImports = (file: string): string[] => {
    const match = file.match(/\[#import.+/gi);
    if(!match) return [];
    else return match
}

export const freemarker: ImportParser = (file: string): string[] => {
   return freemarkerImports(file).map(freemarkerGetFileName);
};

const initialiseTree = (entrypoint: string): Tree<string> => {
    const tree = new Tree<string>();
    const node = new Node<string>(entrypoint);
    tree.setRoot(node);

    return tree;
}

type FileList = string[];

export const crawlFiles: DependencyCrawler = (entrypoint: string, parse: ImportParser) => {
    const parseDeps = (filepath, parsed: string[] = []): FileList => {
        const file = fs.readFileSync(filepath, 'utf8');
        const deps = parse(file).map(filename => {
            return path.resolve(path.parse(filepath).dir, filename)
        }).map(path => {
            return parseDeps(path, [path])
        });

        return parsed.concat(deps.reduce((a, b) => a.concat(b), []));
    };

    let filename = path.resolve(path.parse(entrypoint).dir, entrypoint);
    return parseDeps(filename, [filename]).map(file => fs.readFileSync(file, 'utf8'));
};

export const concatFiles = (files: FileList) => {
    return files.reduce((a, b) => a.concat(`\n${b}`));
};