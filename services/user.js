const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMe(id = 0){
    
    const rows = await db.query(
        `SELECT * FROM user_data WHERE id = ${id}`
    );
    
    const data = helper.emptyOrSingle(rows);
    //console.log(data);

    return {
        data
    }
}

async function updateXp(data){
  
    const result = await db.query(
        `UPDATE user_data 
        SET xp = xp + ${data.xp}, coin = coin + ${data.coin}, stamina = stamina - ${data.stamina}
        WHERE id = ${data.id_user}`
    );
    
    let error = 1; let status = 'error';
    let message = 'Error in updating user';
    
    if (result.affectedRows) {
        //console.log(data);
        message = `User updated successfully`;
        error = 0; status = "success";
        
    }

    return {message, status, error};
}

async function updateConsume(data){
  
    const result = await db.query(
        `UPDATE user_data 
        SET xp = xp + ${data.xp}, coin = coin + ${data.coin}, stamina = stamina + ${data.stamina}
        WHERE id = ${data.id_user}`
    );
    
    let error = 1; let status = 'error';
    let message = 'Error in updating user';
    
    if (result.affectedRows) {
        //console.log(data);
        message = `User updated successfully`;
        error = 0; status = "success";
        
    }

    return {message, status, error};
}

module.exports = {
    updateConsume,
    getMe,
    updateXp
}
