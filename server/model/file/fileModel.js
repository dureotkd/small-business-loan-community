"use strict";

const Core = require("../Core/index");

class FileModel extends Core {
  constructor(props) {
    super(props);

    this.table = "file";

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

  update() {}
}

const fileModel = new FileModel();

module.exports = fileModel;
