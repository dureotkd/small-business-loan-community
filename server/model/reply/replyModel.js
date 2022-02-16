"use strict";

const Core = require("../Core/index");

class ReplyModel extends Core {
  constructor(props) {
    super(props);
    this.table = "reply";
    this.core = new Core();
  }

  getAll(id) {
    const sql = `
    SELECT 
      * 
      , (SELECT nickname FROM loan.user WHERE a.userSeq = seq LIMIT 1) as nickname 
    FROM 
      loan.reply a 
    WHERE 
      a.articleSeq = '${id}'
    ORDER BY 
      a.regDate DESC`;

    const all = this.core.excute({
      database: "loan",
      sql: sql,
      type: "all",
    });

    return all;
  }

  getRowByPk(id) {
    const where = [];

    where.push(`a.userSeq = b.seq`);
    where.push(`a.seq = ${id}`);

    const sql = `SELECT 
      a.* , b.nickname, b.profile 
    FROM 
      loan.article a , loan.user b 
    WHERE 
      %s`.replace("%s", where.join(" AND "));

    const row = this.core.excute({
      database: "loan",
      sql: sql,
      type: "row",
    });

    return row;
  }

  save(data) {
    const sql = this.core.getInsertQuery({ table: this.table, data });

    const res = this.core.excute({
      database: "loan",
      sql: sql,
      type: "exec",
    });

    return res;
  }

  update(data, where) {
    const sql = this.core.getUpdateQuery({ table: this.table, data, where });

    const res = this.core.excute({
      database: "loan",
      sql: sql,
      type: "exec",
    });

    return res;
  }
}

const replyModel = new ReplyModel();

module.exports = replyModel;
