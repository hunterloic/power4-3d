const express = require('express');
const router = express.Router();

const game = require('../model/game');

router.get('/', (req, res, next) => {
    res.status(200).json({
        game : game.get_instance()
    });
});

router.post('/start', (req, res, next) => {
    var turn = game.get_instance().turn;
    game.initialize();

    //switch turn
    if(req.body.firstPlayer) {
        game.get_instance().turn = req.body.firstPlayer;
    }

    res.status(200).json({
        game : game.get_instance()
    });
});

router.post('/play', (req, res, next) => {
    var result = game.play(
        req.body.player,
        req.body.x,
        req.body.y,
        req.body.z,
    );

    if(!result) {
        const error = new Error(game.get_instance().error);
        next(error);
    } else {
        res.status(200).json({
            game : game.get_instance()
        });
    }

});


module.exports = router;