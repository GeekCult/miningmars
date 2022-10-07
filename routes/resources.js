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

express.get('/api', (req, res) => {
  const now = new Date().toUTCString();
  const path = `/api/item/${now}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

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