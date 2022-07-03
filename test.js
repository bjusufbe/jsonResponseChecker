const comparer = require('./lib/comparer.js');

let firstInput = require('./config/firstInput.json');
let secondInput = require('./config/secondInput.json');
let mappingDefinition = require('./config/mappingDefinition.json');

for (let mapping of mappingDefinition) {
    comparer.resolveInitialMappingKey(firstInput, secondInput, mapping );
}
let resolvedMappingDefinitions = comparer.flattenListOfArrays(comparer.mappingResolvedOutput);

firstInput = comparer.sortInputBySpecificKeyOnSpecificPath(firstInput, 'myplace.categories');
secondInput = comparer.sortInputBySpecificKeyOnSpecificPath(secondInput, 'categories', 'type');

firstInput = comparer.sortInputBySpecificKeyOnSpecificPath(firstInput, 'myplace.displayNames', 'name');
secondInput = comparer.sortInputBySpecificKeyOnSpecificPath(secondInput, 'names', 'name');

firstInput = comparer.sortInputBySpecificKeyOnSpecificPath(firstInput, 'myplace.specialHours[0].hoursByDay' , 'day');
secondInput = comparer.sortInputBySpecificKeyOnSpecificPath(secondInput, 'hours.specificHours', 'day');

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
