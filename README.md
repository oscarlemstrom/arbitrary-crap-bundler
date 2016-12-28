# arbitrary-crap-bundler
Bundles arbitrary text files and removes duplicates before concatenation

#USAGE
## ac-bundler CLI
```

  Usage: main [options] <output> <entrypoint> [rest...]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
    --debug        Debug mode, prints dependency tree for inspection
    -o, --output   Folder for the outputed files

```
### Example usage
`ac-bundler --output ./output-folder/ entrypoint1.ftl entrypoint2.ftl`

## As a Node.js package
`npm install oscarlemstrom/arbitrary-crap-bundler --save-dev`

### Javascript
```javascript
var bundler = require('ac-bundler');
var path = require('path');

var entrypoints = ['./files/entrypoint1', './files/entrypoint2']
    .map(function() {
        return path.resolve(__dirname, entry);
    });

bundler.bundle(, './files/output-folder/');
```

### Typescript
```typescript
import * as bundler from 'ac-bundler';
import * as path from 'path';

const entrypoints = ['./files/entrypoint1', './files/entrypoint2']
    .map(entry => path.resolve(__dirname, entry));
const output = path.resolve(__dirname, './files/output/');

bundler.bundle(entrypoints, output);
```

