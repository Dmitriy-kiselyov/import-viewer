function getImports(file) {
    const reqExp = /import .+ from '(.+)';/g;
    const matches = matchAll(file, reqExp);

    return matches;
}

function matchAll(str, reqExp) {
    let result;
    let matches = [];

    while (result = reqExp.exec(str)) {
        matches.push(result[1]);
    }

    return matches;
}

module.exports = {
    getImports
};
