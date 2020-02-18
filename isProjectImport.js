function isProjectImport(projectPath, path) {
    return path.startsWith(projectPath) && !path.includes('node_modules');
}

module.exports = {
    isProjectImport,
};
