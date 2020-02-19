const path = require('path');

const { isProjectImport } = require('./isProjectImport');

function createGraph(projectPath, imports) {
    const graph = {};

    for (const [imprt, from] of imports) {
        if (isProjectImport(projectPath, imprt)) {
            addImport(graph, transformImport(projectPath, imprt).split(path.sep), from);
        } else {
            addImport(graph, ['node_modules', imprt], from);
        }
    }

    return graph;
}


function transformImport(projectPath, imprt) {
    if (isProjectImport(projectPath, imprt)) {
        return imprt.substr(projectPath.length + 1);
    }

    return imprt;
}

function addImport(graph, pathSegments, from) {
    let g = graph;

    for (const p of pathSegments) {
        if (!g.hasOwnProperty(p)) {
            g[p] = {};
        }

        if (p === pathSegments[pathSegments.length - 1]) {
            g[p] = { __import__: true, __from__: from, __path__: pathSegments.join(path.sep) };
        }

        g = g[p];
    }
}

module.exports = {
    createGraph,
};
