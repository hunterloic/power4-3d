const express = require('express');
const router = express.Router();

const game = require('../model/game');

router.get('/', (req, res, next) => {
    game.status += 1;
    res.status(200).json({
        message: 'hello'
    });
});


router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name
    };
    res.status(200).json({
        message: 'hello post',
        product: product
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if(id == 1) {
        res.status(200).json({
            message: 'special id'
        });
    } else {
        res.status(200).json({
            message: 'other id'
        });
    }
});

router.put('/:productId', (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
        message: 'update'
    });
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
        message: 'delete'
    });
});

module.exports = router;