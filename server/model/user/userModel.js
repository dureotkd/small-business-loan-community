"use strict";

const Core = require("../Core/index");

class UserModel extends Core {
  constructor(props) {
    super(props);

    this.table = "user";

    this.core = new Core();
  }

  findByOauthId(id) {
    const sql = `SELECT * FROM loan.user a WHERE a.oauthId = '${id}' LIMIT 1`;

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

const userModel = new UserModel();

module.exports = userModel;
