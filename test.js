const comparer = require('./lib/comparer.js');

let firstInput = require('./config/firstInput.json');
let secondInput = require('./config/secondInput.json');
let mappingDefinition = require('./config/mappingDefinition.json');

// resolve all mappings
for (let mapping of mappingDefinition) {
    comparer.resolveMappingKeys(firstInput, secondInput, mapping );
}
let resolvedMappingDefinitions = comparer.flattenListOfArrays(comparer.mappingResolvedOutput);

// do sorting of the input files so they are consistent
firstInput = comparer.sortInputBySpecificKeyOnSpecificPath(firstInput, 'myplace.categories');
secondInput = comparer.sortInputBySpecificKeyOnSpecificPath(secondInput, 'categories', 'type');

firstInput = comparer.sortInputBySpecificKeyOnSpecificPath(firstInput, 'myplace.displayNames', 'name');
secondInput = comparer.sortInputBySpecificKeyOnSpecificPath(secondInput, 'names', 'name');

firstInput = comparer.sortInputBySpecificKeyOnSpecificPath(firstInput, 'myplace.specialHours[0].hoursByDay' , 'day');
secondInput = comparer.sortInputBySpecificKeyOnSpecificPath(secondInput, 'hours.specificHours', 'day');

// get values from both files based on mappings and do comparison
let mappingSuccessResult = [];
for (let mapping of resolvedMappingDefinitions) {
    let matched = false;
    let firstInputValue = comparer.getValueFromSpecificJsonPath(firstInput, mapping.first);
    let secondInputValue = comparer.getValueFromSpecificJsonPath(secondInput, mapping.second);
    if (firstInputValue === secondInputValue) matched = true;
    mappingSuccessResult.push({
        first: firstInputValue,
        second: secondInputValue,
        match: matched
    })
}
console.log(mappingSuccessResult);
