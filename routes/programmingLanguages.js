const express = require('express');
const router = express.Router();
const programmingLanguages = require('../services/programmingLanguages');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await programmingLanguages.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting resources `, err.message);
    next(err);
  }
});

/* POST programming language */
router.post('/', async function(req, res, next) {
    try {
      
        res.json(await programmingLanguages.create(req));
    } catch (err) {
        console.error(`Error while creating resources`, err.message);
        next(err);
    }
});

module.exports = router;