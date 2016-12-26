import { uniqueOnly } from './utils';

export interface INode<T>  {
    connect(n: INode<T>): void;
    disconnect(n: INode<T>): void;
    depth(currentDepth?: number);
    flatten(values? : T[])
    value: T;
}

export interface ITree<T> {
    setRoot(n: INode<T>): void;
    uniques(): T[];
    maxDepth: number;
}

export class Tree<T> implements ITree<T> {
    private root: INode<T>;

    get rootNode() {
        return this.root;
    }

    setRoot(n: INode<T>) {
        this.root = n;
    }

    uniques(): T[] {
        const values: T[] = [];
        if(!this.root) return values;
        return this.root.flatten().filter(uniqueOnly);
    }

    get maxDepth(): number {
        if(!this.root) return 0;
        return this.root.depth();
    }
}

export class Node<T> implements INode<T> {
    private connected: INode<T>[] = [];
    private val: T;

    constructor(value: T) {
        this.val = value;
    }

    get value(): T {
        return this.val;
    }

    connect(n: INode<T>) {
        if(!this.connected.includes(n)) this.connected.push(n);
    }

    disconnect(n: INode<T>) {
        const index = this.connected.indexOf(n);
        if(index > -1) this.connected.splice(index, 1);
    }

    depth(currentDepth = 0): number {
        const depths = this.connected.map(n => n.depth(currentDepth + 1));
        return depths.reduce((d1, d2) => Math.max(d1, d2), currentDepth);
    }

    flatten(values = []): T[] {
        const newValues = [...values, this.value];
        return newValues.concat(
            this.connected
                .map(n => n.flatten())
                .reduce((v1, v2) => v1.concat(v2), [])
        );
    }
}