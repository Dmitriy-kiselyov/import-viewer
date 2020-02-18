const { getAllImports } = require('./getAllImports');
const { createGraph } = require('./createGraph');
const { printGraph } = require('./printGraph');

function drawImports(projectPath, filePath) {
    const imports = getAllImports(projectPath, filePath);
    const graph = createGraph(projectPath, imports);

    printGraph(graph);
}

const projectPath = 'C:\\Users\\dmitr\\Documents\\Projects\\WebProjects\\TripPlotter';
const filePath = 'C:\\Users\\dmitr\\Documents\\Projects\\WebProjects\\TripPlotter\\src\\index.js';

drawImports(projectPath, filePath);
