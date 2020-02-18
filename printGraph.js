const chalk = require('chalk');

function printGraph(graph) {
    sortGraph(graph);
    fetchIds(graph);

    printNode(graph, '');
}

function sortGraph(graph) {
    if (graph.node_modules) {
        graph.node_modules = getSortedObject(graph.node_modules);
    }
}

function getSortedObject(obj) {
    const keys = Object.keys(obj).sort();
    const newObj = {};

    for (const key of keys) {
        newObj[key] = obj[key];
    }

    return newObj;
}

function fetchIds(graph) {
    // Map = <path, id>
    const map = new Map();
    let id = 1;

    forEachImport(graph, imprt => {
        const curId = imprt.__from__.length === 0 ? 0 : id++;

        map.set(imprt.__path__, curId);

        imprt.__id__ = curId;
    });

    fetchFromIds(graph, map);

    return graph;
}

function fetchFromIds(graph, idMap) {
    forEachImport(graph, imprt => {
        imprt.__fromIds__ = imprt.__from__.map(from => idMap.get(from));
    });
}

function forEachImport(graph, cb) {
    const keys = Object.keys(graph);

    for (const key of keys) {
        const isImport = Boolean(graph[key].__import__);

        if (isImport) {
            cb(graph[key]);
        }

        if (!isImport) {
            forEachImport(graph[key], cb);
        }
    }
}

function printNode(graph, prevSpace) {
    const keys = Object.keys(graph);

    for (const key of keys) {
        const isImport = Boolean(graph[key].__import__);

        let space = prevSpace;

        if (prevSpace) {
            space += '⤷ ';
        }

        console.log(space + (isImport ? printImport(graph[key], key) : key));

        let nextSpace = prevSpace;

        if (prevSpace && key !== keys[keys.length - 1]) {
            nextSpace += '⎸ ';
        } else {
            nextSpace += '  ';
        }
        if (prevSpace) {
            nextSpace += '  ';
        }

        !isImport && printNode(graph[key], nextSpace);
    }
}

function printImport(imprt, key) {
    let name = '';
    const id = `(${imprt.__id__})`;

    if (imprt.__id__ === 0) {
        name = getPrintedFileName(`${chalk.blue(id)} ${chalk.green(key)}`);
    } else {
        const fromIds = `(from ${imprt.__fromIds__.sort((a, b) => a - b).join(' ')})`;

        name = getPrintedFileName(`${chalk.blue(id)} ${chalk.red(key)} ${chalk.blue(fromIds)}`);
    }

    return name;
}

function getPrintedFileName(fileName) {
    return makeBold(fileName, [
        'touch-phone',
        'touch-pad',
        'touch',
        'desktop'
    ]);
}

function makeBold(fileName, platforms) {
    for (const platform of platforms) {
        const newName = fileName.replace(platform, chalk.bold(platform));

        if (newName !== fileName) {
            return newName;
        }
    }

    return fileName;
}

module.exports = {
    printGraph,
};
