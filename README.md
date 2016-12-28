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
bundler.bundle(['./files/entrypoint1', './files/entrypoint2'], './files/output-folder/');
```

### Typescript
```typescript
import * as bundler from 'ac-bundler';
bundler.bundle(['./files/entrypoint1', './files/entrypoint2'], './files/output-folder/');
```

