const characters = require('../data/characters');
const { replaceCharacter, createCharacter, inputValidation} = require('../domain/character');
let writeQueue = Promise.resolve();


function enqueueWrite(operation){
    const result = writeQueue.then(() => operation());
    writeQueue = result.catch(() => {});
    return result;
}

function saveCharacter(name, role, planet) {
    return enqueueWrite(async () =>{
        const status = inputValidation(name, role, planet);
        if(status !== 'SUCCESS')
            return status;
        characters.push(await createCharacter(name, role, planet));
        return status
    });
}

function updateCharacter(id, name, role, planet) {
    return enqueueWrite(async () =>{
        const status = inputValidation(name, role, planet);
        if(status !== 'SUCCESS')
            return status;
        const index = characters.findIndex(character => character.id === id);
        characters[index] = await replaceCharacter(id, name, role, planet);
        return status
    });
}
function getAllCharacters() {
    return characters;
}

function getCharacter(id) {
    return characters.find(character => character.id === id);
}

function deleteCharacter(id) {
    return enqueueWrite(async () =>{
        const index = characters.findIndex(character => character.id === id);
        if(index === -1)
            return 'NOT_FOUND'
        characters.splice(index, 1);
    });
}

function getCharacterByIndex(index) {
    return characters[index];
}


module.exports = { saveCharacter, getAllCharacters, getCharacter, deleteCharacter ,updateCharacter, getCharacterByIndex };