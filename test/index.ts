import * as acBundler from '../src/';
import * as path from 'path';
import * as fs from 'fs';

import { expect } from 'chai';

describe('Main module', () => {
    const entry = path.resolve(__dirname, './files/freemarker/entry.ftl');
    const output = path.resolve(__dirname, './files/output/');

    it('should create output file after running bundle', () => {
        acBundler.bundle([entry], output).then(_ => {
            const fileExists = fs.exists(path.resolve(__dirname, './files/output/entry.ftl'));
            expect(fileExists).to.equal(true);

        })
    })
});
