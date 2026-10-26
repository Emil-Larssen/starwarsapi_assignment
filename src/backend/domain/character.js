const { randomUUID } = require('node:crypto');

function createCharacter(name, role, planet){
    return {
        id: randomUUID(),
        name,
        role,
        planet
    }
}

function replaceCharacter(id, name, role, planet){
    return {
        id,
        name,
        role,
        planet
    }
}

function inputValidation(name, role, planet){
    if(typeof name !== 'string' || name.trim().length < 2)
        return 'INVALID_NAME'
    if(typeof role !== 'string' || role !== 'Jedi' && role !== 'Sith'&& role !== 'Rebel' && role !== 'Smuggler' )
        return 'INVALID_ROLE'
    if(typeof planet !== 'string' || planet.trim().length < 1)
        return 'INVALID_PLANET'
    return 'SUCCESS';
}

module.exports = { createCharacter, replaceCharacter, inputValidation };
