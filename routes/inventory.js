const express = require('express');
const router = express.Router();
const inventory = require('../services/inventory');

/* GET Inventory. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await inventory.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting inventory `, err.message);
    next(err);
  }
});

module.exports = router;