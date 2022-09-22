const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * 
    FROM resources LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(programmingLanguage){
    //console.log();
  const result = await db.query(
    `INSERT INTO inventory 
    (id_item, amount) 
    VALUES 
    (4, 1)`
  );

  let message = 'Error in creating programming language' ;

  if (result.affectedRows) {
    message = 'Programming language created successfully' + programmingLanguage.title;
  }

  return {message};
}

module.exports = {
  getMultiple,
  create
}