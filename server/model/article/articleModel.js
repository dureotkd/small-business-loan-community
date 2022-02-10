"use strict";

const Core = require("../Core/index");

class ArticleModel extends Core {
  constructor(props) {
    super(props);

    this.table = "article";

    this.core = new Core();
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
