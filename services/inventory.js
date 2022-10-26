const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
    
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT A.id, A.id_item, A.amount, B.title, B.image, B.type, B.description  FROM inventory AS A INNER JOIN resources AS B ON B.id = A.id_item ORDER BY B.title ASC LIMIT ${offset},100`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}

async function getItem(nr = 1){
    const offset = helper.getEasyset(nr);
    const row = await db.query(
        `SELECT A.id, A.id_item, A.amount, B.title, B.description, B.image FROM inventory AS A INNER JOIN resources AS B ON B.id = A.id_item WHERE A.id = ${offset}`
    );
  
    const data = helper.emptyOrSingle(row);
    const meta = {nr};
  
    return {
        data,
        meta
    }
}

async function getMine(nr = 1){
    const offset = helper.getEasyset(nr);
    const rows = await db.query(
        `SELECT id, title, image, value FROM resources ORDER BY RAND() LIMIT 0, ${offset}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {nr};

    return {
          data,
          meta
    }
}

async function getMarketplace(nr = 1){
    const offset = helper.getEasyset(nr);
    const rows = await db.query(
        `SELECT id, title, image, coins, amount FROM marketplace ORDER BY id DESC LIMIT 0, 10`
    );
    
    const data = helper.emptyOrRows(rows);
    const meta = {nr};

    return {
        data,
        meta
    }
}

async function getStore(nr = 1){
    const offset = helper.getEasyset(nr);
    const rows = await db.query(
        `SELECT id, title, description, image, value FROM resources WHERE type = '3' ORDER BY id DESC LIMIT 0, 10`
    );
    
    const data = helper.emptyOrRows(rows);
    const meta = {nr};

    return {
        data,
        meta
    }
}

//POST
async function sell(data){
    //console.log(data);
    const result = await db.query(
        `INSERT INTO marketplace 
        (id_item, id_user, amount, coins, title, image) 
        VALUES 
        (${data.id_item}, ${data.id_user}, ${data.amount}, ${data.coins}, '${data.title}', '${data.image}')`
    );
    
    if ( result.affectedRows) {
        const result = await db.query(
            `UPDATE inventory 
            SET amount = amount - ${data.amount} 
            WHERE id = ${data.id_item} AND id_user = ${data.id_user}`
        );
    }

    let message = 'Error in selling inventory';
    
    if (result.affectedRows) {
        
        message = `Selling added successfully`;
        
    }

    return {message};
}

async function consume(data){
    //console.log(data);
 
    const result = await db.query(
        `UPDATE inventory 
        SET amount = amount - ${data.amount} 
        WHERE id = ${data.id_item} AND id_user = ${data.id_user}`
    );
    

    let message = 'Error in consuming item';
    
    if (result.affectedRows) {
        
        message = `Item consumed`;
        
    }

    return {message};
}

module.exports = {
    getMarketplace,
    getMultiple,
    getMine,
    getItem,
    getStore,
    consume,
    sell
}