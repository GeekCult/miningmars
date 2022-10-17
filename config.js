const config = {
  db: {
    /* don't expose password or any sensitive info, done only for demo */
    host: "mysql02-farm10.kinghost.net",
    user: "mars",
    password: "S0mKl23gNec43",
    database: "mars",
    port: 3306
  },
  db2: {
    /* don't expose password or any sensitive info, done only for demo */
    host: "localhost",
    user: "root",
    password: "root",
    database: "mars"
  },
  db3: {
    /* don't expose password or any sensitive info, done only for demo */
    host: "162.241.78.8",
    user: "geekcultcom_mars",
    password: "M4Rsj98$Acg#dY%r4#H@t09f3*r@",
    database: "geekcultcom_mars"
  },
  listPerPage: 10
};
module.exports = config;
