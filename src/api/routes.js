const express = require('express');
const router = express.Router();
module.exports = router;
const { saveCharacter, getAllCharacters, getCharacter, deleteCharacter, updateCharacter} = require('../backend/repositories/characterRepository');
const app = require("express/lib/application");

router.get('/characters', async (req, res) => {
    try{
        const characters = await getAllCharacters();
        res.status(200).json(characters);
    }catch(error){
        res.status(500).json({message: error.message});
    }
})
router.get('/characters/:id', characterExists, async (req, res) => {
    try{
        res.status(200).json(req.character);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});
router.post('/characters', async (req, res) => {
    try{
        const result = await saveCharacter(req.body.name, req.body.role, req.body.planet);
        if(result !== 'SUCCESS')
            return inputValidationResponse(result, res);
        res.sendStatus(201);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});
router.put('/characters/:id', characterExists, async (req, res) => {
    try{
        const result = await updateCharacter(req.params.id, req.body.name, req.body.role, req.body.planet);
        if(result !== 'SUCCESS')
            return inputValidationResponse(result, res);
        res.sendStatus(200);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});
router.delete('/characters/:id',characterExists, async (req, res) => {
    try{
        await deleteCharacter(req.params.id);
        res.status(204).send()
    }catch(error){
        res.status(500).json({message: error.message});
    }
})

// non-valid paths
router.use((req, res) => res.status(404).json({message: 'Not found'}));

// middleware that validates if the character exists, stops request if not and returns the error.
async function characterExists(req, res, next) {
    try{
        const character = await getCharacter(req.params.id);
        if (character === undefined){
            return res.status(404).json({message: 'Character not found'});
        }
        req.character = character;
        next();
    } catch(error){
        next(error);
    }
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