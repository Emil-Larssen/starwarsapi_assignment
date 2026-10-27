const express = require('express');
const app = express();
const path = require('path');
const characterService = require('./backend/services/characterService');
const errorHandler = require('./api/errorHandler');

//Starting the server
app.listen(3000, () => console.log('Server started on port 3000'));

//Initialized data
characterService.saveCharacter('Luke Skywalker', 'Jedi', 'Tatooine')
characterService.saveCharacter('Darth Vader', 'Sith', 'Tatooine');
characterService.saveCharacter('Leia Organa', 'Rebel', 'Alderaan');
characterService.saveCharacter('Han Solo', 'Smuggler', 'Corellia');

// Method & URL logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'frontend')));

//api endpoints
const router = require('./api/routes');
app.use(express.json());
app.use(router);

// Invalid paths
router.use((req, res) => res.status(404).json({message: 'Not found'}));

//Central handler for unexpected errors
app.use(errorHandler);