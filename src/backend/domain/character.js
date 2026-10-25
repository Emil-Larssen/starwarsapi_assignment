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

module.exports = { createCharacter, replaceCharacter };
