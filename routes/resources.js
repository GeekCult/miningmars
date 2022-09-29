const express = require('express');
const router = express.Router();
const resources = require('../services/resources');

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

/* GET resources */
router.get('/', async function(req, res, next) {
    try {
        res.json(await resources.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting resources `, err.message);
        next(err);
    }
});

/* POST resources */
router.post('/', async function(req, res, next) {
    try {

        res.json(await resources.create(req.body));
    } catch (err) {
        console.error(`Error while creating resources`, err.message);
        next(err);
    }
});

module.exports = router;