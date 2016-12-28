export interface INode<T> {
    connect(n: INode<T>): void;
    disconnect(n: INode<T>): void;
    depth(currentDepth?: number): any;
    flatten(values?: T[]): any;
    value: T;
}
export declare class FileNameTree {
    private root;
    readonly rootNode: string[];
    setRoot(root: string[]): void;
    uniques(): string[];
}
export declare class Node<T> implements INode<T> {
    private connected;
    private val;
    constructor(value: T);
    readonly value: T;
    connect(n: INode<T>): void;
    disconnect(n: INode<T>): void;
    depth(currentDepth?: number): number;
    flatten(values?: any[]): T[];
}
