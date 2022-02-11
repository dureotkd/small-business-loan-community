"use strict";

const Core = require("../Core/index");

class ArticleModel extends Core {
  constructor(props) {
    super(props);

    this.table = "article";

    this.core = new Core();
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

const articleModel = new ArticleModel();

module.exports = articleModel;
