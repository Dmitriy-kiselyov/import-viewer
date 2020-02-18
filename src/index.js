const path = require('path');

const { getAllImports } = require('./getAllImports');
const { createGraph } = require('./createGraph');
const { printGraph } = require('./printGraph');

function viewImports(projectPath, filePath) {
    const absoluteFilePath = path.join(projectPath, filePath);
    const imports = getAllImports(projectPath, absoluteFilePath);
    const graph = createGraph(projectPath, imports);

    printGraph(graph);
}

module.exports = {
    viewImports
};
