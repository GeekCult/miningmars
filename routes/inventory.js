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

/* GET Inventory Mine */
router.get('/mine', async function(req, res, next) {
  try {
        //console.log(req.query.page);
        res.json(await inventory.getMine(req.query.nr));
  } catch (err) {
        console.error(`Error while getting inventory `, err.message);
        next(err);
  }
});

/* GET Inventory Item */
router.get('/item', async function(req, res, next) {
  try {
        //console.log(req.query.page);
        res.json(await inventory.getItem(req.query.nr));
  } catch (err) {
        console.error(`Error while getting item `, err.message);
        next(err);
  }
});

/* GET Marketplace */
router.get('/marketplace', async function(req, res, next) {
  try {
        //console.log(req.query.page);
        res.json(await inventory.getMarketplace(req.query.nr));
  } catch (err) {
        console.error(`Error while getting marketplace `, err.message);
        next(err);
  }
});

/* GET Store */
router.get('/store', async function(req, res, next) {
  try {
        //console.log(req.query.page);
        res.json(await inventory.getStore(req.query.nr));
  } catch (err) {
        console.error(`Error while getting store `, err.message);
        next(err);
  }
});


/* POST sell */
router.post('/sell', async function(req, res, next) {
    try {

        res.json(await inventory.sell(req.body));
    } catch (err) {
        console.error(`Error while selling inventory`, err.message);
        next(err);
    }
});

/* POST cosnume */
router.post('/consume', async function(req, res, next) {
    try {

        res.json(await inventory.consume(req.body));
    } catch (err) {
        console.error(`Error while selling inventory`, err.message);
        next(err);
    }
});

module.exports = router;