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

async function updateXp(data){
  
    const result = await db.query(
        `UPDATE user_data 
        SET xp = xp + ${data.xp}, coin = coin + ${data.coin}, stamina = stamina - ${data.stamina}
        WHERE id = ${data.id_user}`
    );

    let message = 'Error in updating user';
    
    if (result.affectedRows) {
        //console.log(data);
        message = `User updated successfully`;
        
    }

    return {message};
}

module.exports = {
    getMultiple,
    updateXp
}
