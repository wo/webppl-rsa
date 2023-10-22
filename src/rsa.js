// Exported functions can be accessed in rsa.wppl as webpplRsa.<functionName>

var numAgents = 0;

function getNewAgentId() {
    numAgents++;
    return numAgents;
}

function createObject(key, value) {
    let obj = {};
    if (_.isArray(key)) {
        for (let i = 0; i < key.length; i++) {
            obj[key[i]] = value[i];
        }
    }
    else {
        obj[key] = value;
    }
    return obj;
}

function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

function asciiTable(data) {
    const colWidths = data[0].map((_, colIndex) =>
        Math.max(...data.map(row => String(row[colIndex]).length))
    );
    let table = '';
    data.forEach(row => {
        row.forEach((cell, colIndex) => {
            table += `${String(cell).padEnd(colWidths[colIndex] + 2)} `;
        });
        table += '\n';
    });
    return table;
}

function namedFunction(name, fn) {
    return {
        toString: function() { return name },
        toJSON: function() { return name },
        fn: fn
    }
}

let objectStore = {};
function storeObject(objTypeName, name, obj) {
    if (!objectStore[objTypeName]) {
        objectStore[objTypeName] = {};
    }
    objectStore[objTypeName][name] = obj;
}

function getObject(objTypeName, name) {
    if (!objectStore[objTypeName]) {
        throw new Error('No objects of type ' + objTypeName + ' stored.');
    }
    if (!objectStore[objTypeName][name]) {
        throw new Error('No object of type ' + objTypeName + ' with name ' + name + ' stored.');
    }
    return objectStore[objTypeName][name];
}

function getAllObjects(objTypeName) {
    if (!objectStore[objTypeName]) {
        throw new Error('No objects of type ' + objTypeName + ' stored.');
    }
    return objectStore[objTypeName];
}

function mkAgent(dict) {
    dict.toString = dict.toJSON;
    dict.isAgent = true;
    return dict;
}

var applyFunction = function(fn, arr) {
    switch(arr.length) {
        case 1:
            return function() { fn(arr[0]); };
        case 2:
            return function() { fn(arr[0], arr[1]); };
        case 3:
            return function() { fn(arr[0], arr[1], arr[2]); };
        default:
            throw new Error("Too many parameters for applyFunction");
    }
};

module.exports = {
    assert: assert,
    createObject: createObject,
    getNewAgentId: getNewAgentId,
    asciiTable: asciiTable,
    namedFunction: namedFunction,
    storeObject: storeObject,
    getObject: getObject,
    getAllObjects: getAllObjects,
    mkAgent: mkAgent,
    applyFunction: applyFunction
};
