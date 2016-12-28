export interface ImportParser {
    (file: string): string[];
}
export interface DependencyCrawler {
    (entrypoint: string, parse: ImportParser): any[];
}
export declare const freemarkerImports: (file: string) => string[];
export declare const freemarker: ImportParser;
export declare const crawlFiles: DependencyCrawler;
