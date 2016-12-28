"use strict";
const utils_1 = require("./utils");
const flattenArrayTree = (root, flat = []) => {
    root.forEach(node => {
        if (typeof node === 'string')
            flat.push(node);
        else if (Array.isArray(node)) {
            return flattenArrayTree(node, flat);
        }
    });
    return flat;
};
class FileNameTree {
    get rootNode() {
        return this.root;
    }
    setRoot(root) {
        this.root = root;
    }
    uniques() {
        const values = [];
        if (!this.root)
            return values;
        return flattenArrayTree(this.root).reverse().filter(utils_1.uniqueOnly);
    }
}
exports.FileNameTree = FileNameTree;
class Node {
    constructor(value) {
        this.connected = [];
        this.val = value;
    }
    get value() {
        return this.val;
    }
    connect(n) {
        if (!this.connected.includes(n))
            this.connected.push(n);
    }
    disconnect(n) {
        const index = this.connected.indexOf(n);
        if (index > -1)
            this.connected.splice(index, 1);
    }
    depth(currentDepth = 0) {
        const depths = this.connected.map(n => n.depth(currentDepth + 1));
        return depths.reduce((d1, d2) => Math.max(d1, d2), currentDepth);
    }
    flatten(values = []) {
        const newValues = [...values, this.value];
        return newValues.concat(this.connected
            .map(n => n.flatten())
            .reduce((v1, v2) => v1.concat(v2), []));
    }
}
exports.Node = Node;
//# sourceMappingURL=dependency-tree.js.map