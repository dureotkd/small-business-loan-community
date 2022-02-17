"use strict";

const mysql = require("mysql");
const db = mysql.createPoolCluster();

db.add("loan", {
  host: "",
  user: "",
  password: "",
  database: "",
  port: 3306,
});

module.exports.db = db;
