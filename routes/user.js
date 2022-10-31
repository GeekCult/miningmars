const express = require('express');
const router = express.Router();
const user = require('../services/user');

/* GET resources */
router.get('/me', async function(req, res, next) {
    try {
        res.json(await user.getMe(req.query.id));
    } catch (err) {
        console.error(`Error while getting user info `, err.message);
        next(err);
    }
});

/* POST user */
router.post('/xp', async function(req, res, next) {
    try {

        res.json(await user.updateXp(req.body));
    } catch (err) {
        console.error(`Error while update xp`, err.message);
        next(err);
    }
});

/* POST consume */
router.post('/consume', async function(req, res, next) {
    try {

        res.json(await user.updateConsume(req.body));
    } catch (err) {
        console.error(`Error while update consume`, err.message);
        next(err);
    }
});

/* POST Save user */
router.post('/save', async function(req, res, next) {
    try {

        res.json(await user.saveUser(req.body));
    } catch (err) {
        console.error(`Error while save user`, err.message);
        next(err);
    }
});

module.exports = router;