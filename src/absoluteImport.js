const pathLib = require('path');
const fs = require('fs');

const NODE_MODULES = 'node_modules';

function absoluteImport(path, imprt) {
    if (!imprt.startsWith('.')) {
        return imprt;
    }

    if (imprt.includes(NODE_MODULES)) {
        const index = imprt.indexOf(NODE_MODULES);

        return imprt.slice(index + NODE_MODULES.length + 1);
    }

    return findFile(pathLib.join(path, '..', imprt));
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
