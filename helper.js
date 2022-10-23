function getOffset(currentPage = 1, listPerPage) {
  return (currentPage - 1) * [listPerPage];
}

function getEasyset(currentPage = 1) {
  return (currentPage);
}

function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

function emptyOrSingle(row) {
  if (!row) {
    return false;
  }
  return row[0];
}

module.exports = {
  getOffset,
  getEasyset,
  emptyOrRows,
  emptyOrSingle
}