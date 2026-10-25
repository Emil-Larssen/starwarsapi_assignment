const express = require('express');
const router = express.Router();
const { createCharacter } = require('../backend/domain/character');
module.exports = router;
const { saveCharacter, getAllCharacters, getCharacter, deleteCharacter, updateCharacter} = require('../backend/repositories/characterRepository');
const characters = require("../backend/data/characters");

router.get('/characters', async (req, res) => {
    try{
        const characters = await getAllCharacters();
        res.status(200).json(characters);
    }catch(error){
        res.status(500).json({message: error.message});
    }
})
router.get('/characters/:id', async (req, res) => {
    try{
        const character = await getCharacter(req.params.id);
        res.status(200).json(character);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});
router.post('/characters', async (req, res) => {
    try{
        await saveCharacter(req.body.name, req.body.role, req.body.planet);
        res.sendStatus(201);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});
router.put('/characters/:id', async (req, res) => {
    try{
        await updateCharacter(req.params.id, req.body.name, req.body.role, req.body.planet);
        res.status(200).send();
    }catch(error){
        res.status(500).json({message: error.message});
    }
});
router.delete('/characters/:id', async (req, res) => {
    try{
        await deleteCharacter(req.params.id);
        res.status(204).send()
    }catch(error){
        res.status(500).json({message: error.message});
    }
})