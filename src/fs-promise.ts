import * as fs from 'fs';
import * as promisify from 'es6-promisify';

const promisified: any = {};
Object.keys(fs)
    .filter(key => typeof fs[key] === 'function')
    .forEach(fnName => promisified[fnName] = promisify(fs[fnName], { thisArg: fs }));

export const fsPromise = promisified;