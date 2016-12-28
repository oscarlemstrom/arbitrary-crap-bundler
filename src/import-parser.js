"use strict";
const fs = require("fs");
const path = require("path");
const freemarkerGetFileName = (importStatement) => {
    return importStatement
        .replace(/\[#import\s+/, '')
        .replace(/\s*\]/, '');
};
exports.freemarkerImports = (file) => {
    const match = file.match(/\[#import.+/gi);
    if (!match)
        return [];
    else
        return match;
};
exports.freemarker = (file) => {
    return exports.freemarkerImports(file).map(freemarkerGetFileName);
};
exports.crawlFiles = (entrypoint, parse) => {
    const parseDeps = (filepath, parsed = []) => {
        const file = fs.readFileSync(filepath, 'utf8');
        const deps = parse(file).map(filename => {
            return path.resolve(path.parse(filepath).dir, filename);
        }).map(path => {
            return parseDeps(path, [path]);
        });
        if (deps.length > 0)
            return [...parsed, deps];
        else
            return parsed;
    };
    let filename = path.resolve(path.parse(entrypoint).dir, entrypoint);
    return parseDeps(filename, [filename]);
};
