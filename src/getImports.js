function getImports(file) {
    const regExp = /(import|export) [\s\S]+? from '(.+)';/g;
    const matches = matchAll(file, regExp);

    return unique(matches);
}

function unique(arr) {
    const set = new Set();

    for (const a of arr) {
        set.add(a);
    }

    return Array.from(set.keys());
}

function matchAll(str, reqExp) {
    let result;
    let matches = [];

    while (result = reqExp.exec(str)) {
        matches.push(result[2]);
    }

    return matches;
}

module.exports = {
    getImports
};
