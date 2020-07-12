const express = require('express');
const router = express.Router();

const game = require('../model/game');
const Player = require('../model/player');

router.post('/join', (req, res, next) => {
    
    var noTaken = game.get_instance().players.map((p) => { return p.no });

    if(noTaken.length == 2) {
        const error = new Error('The game is full');
        next(error);
        return;
    }

    var no = req.body.no || (noTaken.length == 0 ? 1 : noTaken[0] == 1 ? 2 : 1);
    var name = req.body.name;

    if(no > 2 || no < 1) {
        const error = new Error('Incorrect player number');
        next(error);
        return;
    }

    if(noTaken.includes(no)) {
        const error = new Error('Player position already taken');
        next(error);
        return;
    }

    if(!name || name.length == 0) {
        const error = new Error('Name is empty');
        next(error);
        return;
    }

    var player = new Player(no, name);
    game.get_instance().players.push(player);

    res.status(200).json({
        player : player,
        game: game.get_instance()
    });
});


module.exports = router;