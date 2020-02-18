const fs = require('fs');

const { getImports } = require('./getImports');
const { absoluteImport } = require('./absoluteImport');
const { isProjectImport } = require('./isProjectImport');

function getAllImports(projectPath, path) {
    // Map = <import, from>
    const importsMap = new Map();
    importsMap.set(path, []);
    let nextImports = [path];

    while(nextImports.length > 0) {
        const path = nextImports[0];
        const file = fs.readFileSync(path).toString();

        let imports = getImports(file)
            .map(imprt => absoluteImport(path, imprt));

        imports.forEach(imprt => importsMap.has(imprt) && importsMap.get(imprt).push(getFromPath(projectPath, path)));

        imports = imports.filter(imprt => !importsMap.has(imprt));

        for (const imprt of imports) {
            importsMap.set(imprt, [getFromPath(projectPath, path)]);

            if (isProjectImport(projectPath, imprt)) {
                nextImports.push(imprt);
            }
        }

        nextImports = nextImports.slice(1);
    }

    return importsMap;
}

function getFromPath(projectPath, path) {
    return path.startsWith(projectPath) ? path.substring(projectPath.length + 1) : path;
}

module.exports = {
    getAllImports,
};
