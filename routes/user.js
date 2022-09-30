const express = require('express');
const router = express.Router();
const user = require('../services/user');

/* GET resources */
router.get('/', async function(req, res, next) {
    try {
        res.json(await user.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting resources `, err.message);
        next(err);
    }
});

/* POST user */
router.post('/xp', async function(req, res, next) {
    try {

        res.json(await user.updateXp(req.body));
    } catch (err) {
        console.error(`Error while creating resources`, err.message);
        next(err);
    }
});

module.exports = router;