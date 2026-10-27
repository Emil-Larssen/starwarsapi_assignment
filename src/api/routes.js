const express = require('express');
const router = express.Router();
module.exports = router;
const { saveCharacter, getAllCharacters, getCharacter, deleteCharacter, updateCharacter, getCharacterByIndex} = require('../backend/services/characterService');
const {join} = require("node:path");

router.get('/characters', async (req, res) => {
    const characters = await getAllCharacters();
    res.status(200).json(characters);
});

router.get('/characters/:id', characterExists, async (req, res) => {
        res.status(200).json(req.character);
});

router.post('/characters', async (req, res) => {
    if (req.body == null)
        return res.status(400).json({message: 'Request body is missing'});
    const result = await saveCharacter(req.body.name, req.body.role, req.body.planet);
    if(result !== 'SUCCESS')
        return inputValidationResponse(result, res);
    res.sendStatus(201);
});

router.put('/characters/:id', characterExists, async (req, res) => {
    if (req.body == null)
        return res.status(400).json({message: 'Request body is missing'});
    const result = await updateCharacter(req.params.id, req.body.name, req.body.role, req.body.planet);
    if(result !== 'SUCCESS')
        return inputValidationResponse(result, res);
    res.sendStatus(200);
});

router.delete('/characters/:id',characterExists, async (req, res) => {
    await deleteCharacter(req.params.id);
    res.status(204).send()
});

router.get('/download', (req, res) => {
    const filePath = join(__dirname, '../backend/data/rebel-alliance.txt');
    res.download(filePath, 'rebel-alliance.txt');
});

router.get('/go-to-luke', async (req, res) => {
    const luke = await getCharacterByIndex(0);
    res.redirect(`/characters/${luke.id}`);
});

// middleware that validates if the character exists, stops request if not and returns the error.
async function characterExists(req, res, next) {
    const character = await getCharacter(req.params.id);
    if (character === undefined){
        return res.status(404).json({message: 'Character not found'});
    }
    req.character = character;
    next();
}

function inputValidationResponse(result, res){
    switch(result){
        case 'INVALID_NAME':
            return res.status(400).json({message: 'Name must be a string with at least 2 characters'});
        case 'INVALID_ROLE':
            return res.status(400).json({message: 'Role must be either: Jedi, Sith, Rebel or Smuggler'});
        case 'INVALID_PLANET':
            return res.status(400).json({message: 'Planet must be a non-empty string'});
        default:
            throw new Error(`Unexpected repository result: ${result}`)
    }
}