const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);

  const rows = await db.query(
    `SELECT * 
        FROM resources LIMIT ${offset}, 100`
  );

  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

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

async function create(data) {
  const result = await db.query(
    `UPDATE inventory 
        SET amount = amount + ${data.amount} 
        WHERE id_item = ${data.id_item} AND id_user = ${data.id_user}`
  );

  if (!result.affectedRows) {
    const result = await db.query(
      `INSERT INTO inventory 
            (id_item, id_user, amount) 
            VALUES 
            (${data.id_item}, ${data.id_user}, ${data.amount})`
    );
  }

  let message = "Error in adding inventory";

  if (result.affectedRows) {
    //console.log(data);
    message = `Inventory added successfully: ${data.id_item}`;
  }

  return { message };
}

module.exports = {
  getMultiple,
  create,
};
