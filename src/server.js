const express = require('express');
const app = express();
const characterRepository = require('./backend/repositories/characterRepository');


//Starting the server
app.listen(3000, () => console.log('Server started on port 3000'));

//Initialized data
characterRepository.saveCharacter('Luke Skywalker', 'Jedi', 'Tatooine')
characterRepository.saveCharacter('Darth Vader', 'Sith', 'Tatooine');
characterRepository.saveCharacter('Leia Organa', 'Rebel', 'Alderaan');
characterRepository.saveCharacter('Han Solo', 'Smuggler', 'Corellia');

// Method & URL logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

//api endpoints
const router = require('./api/routes');
app.use(express.json());
app.use(router);

// Invalid paths
router.use((req, res) => res.status(404).json({message: 'Not found'}));

//Central handler for unexpected errors
app.use(errorHanlder);