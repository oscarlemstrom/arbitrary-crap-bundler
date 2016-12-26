export interface ImportParser {
    (file: string): string[]
};

const freemarkerGetFileName = (importStatement: string): string => {
    return importStatement
        .replace(/\[#import\s+/, '')
        .replace(/\s*\]/, '');
};

export const freemarker: ImportParser = (file: string) => {
    const match = file.match(/\[#import.+/gi);
    return match.map(freemarkerGetFileName);
};