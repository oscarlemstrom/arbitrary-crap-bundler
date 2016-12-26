import * as fs from 'fs';
import * as path from 'path';

export interface ImportParser {
    (file: string): string[]
}

export interface DependencyCrawler {
    (entrypoint: string, parse: ImportParser): any[];
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

export const crawlFiles: DependencyCrawler = (entrypoint: string, parse: ImportParser) => {
    const parseDeps = (filepath, parsed: string[] = []): any[] => {
        const file = fs.readFileSync(filepath, 'utf8');
        const deps = parse(file).map(filename => {
            return path.resolve(path.parse(filepath).dir, filename)
        }).map(path => {
            return parseDeps(path, [path])
        });

        if(deps.length > 0) return [...parsed, deps];
        else return parsed;

    };

    let filename = path.resolve(path.parse(entrypoint).dir, entrypoint);
    return parseDeps(filename, [filename]);
};