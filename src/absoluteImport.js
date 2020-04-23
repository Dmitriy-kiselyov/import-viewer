const pathLib = require('path');
const fs = require('fs');

const NODE_MODULES = 'node_modules';

function absoluteImport(projectPath, path, imprt) {
    let filePath;

    if (imprt.startsWith('.')) {
        if (imprt.includes(NODE_MODULES)) {
            const index = imprt.indexOf(NODE_MODULES);

            return imprt.slice(index + NODE_MODULES.length + 1);
        }

        filePath = pathLib.join(path, '..', imprt);
    } else {
        filePath = pathLib.join(projectPath, imprt);
    }

    const foundFile = findFile(filePath);

    return foundFile || imprt; // imprt = from node_modules
}

function findFile(path) {
    const paths = [
        path + '.tsx',
        path + '.ts',
        pathLib.join(path, 'index.ts'),
        pathLib.join(path, 'index.tsx'),
        pathLib.join(path, 'index.d.ts'),
        path,
        path + '.d.ts',
    ];
    let correct;

    for (const path of paths) {
        if (fs.existsSync(path)) {
            correct = path;
            break;
        }
    }

    return correct;
}

module.exports = {
    absoluteImport
};
