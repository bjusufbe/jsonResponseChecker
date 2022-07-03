const _ = require('lodash');

let mappingResolvedOutput = [];

function sortInputBySpecificKeyOnSpecificPath(inputFile, jsonPath, sortByKey = '') {
    let arrayForSorting = _.get(inputFile, jsonPath);
    let sortedArray;
    if (sortByKey == '') {
        sortedArray = _.sortBy(arrayForSorting);
    } else {
        sortedArray = _.sortBy(arrayForSorting, sortByKey);
    }
    return _.set(inputFile, jsonPath, sortedArray);
}

function getValueFromSpecificJsonPath(inputFile, jsonPath) {
    return _.get(inputFile, jsonPath);
}

function resolveMappingKey(inputFile, keyName, mappingPath) {
    resolvedMappingOutput = []

    let mappedValueInputLength = '';
    if (mappingPath.includes("*")) {
        mappedValueInputLength = this.getValueFromSpecificJsonPath(inputFile, mappingPath.split("[*]")[0]).length;
    }
    if (mappedValueInputLength == '') {
        let obj = {};
        obj[keyName] = mappingPath;
        resolvedMappingOutput.push(obj);
    } else {
        for (let i = 0; i < mappedValueInputLength; i++) {
            let resolvedInput = mappingPath.replace('*', i);
            let obj = {};
            obj[keyName] = resolvedInput;
            resolvedMappingOutput.push(obj);
            if (resolvedInput.includes("*")) {
                this.resolveMappingKey(inputFile, keyName, resolvedInput);
            }
        }
    }
    return resolvedMappingOutput;
}

function resolveInitialMappingKey(firstInputFile, secondInputFile, mapping) {
    let leftSideMappings = this.resolveMappingKey(firstInputFile, 'first', mapping.first);
    let rightSideMappings = this.resolveMappingKey(secondInputFile, 'second', mapping.second);

    for (let i = 0; i < leftSideMappings.length; i++) {
        mappingResolvedOutput.push({
            first: leftSideMappings[i].first,
            second: rightSideMappings[i].second
        })
    }
}

function flattenListOfArrays(listOfArrays) {
    return _.flatten(listOfArrays);
}

module.exports = {
    getValueFromSpecificJsonPath,
    sortInputBySpecificKeyOnSpecificPath,
    resolveInitialMappingKey,
    flattenListOfArrays,
    mappingResolvedOutput,
    resolveMappingKey
};