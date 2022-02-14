"use strict";
const { db } = require("./database");

class Core {
  /**
   * * MAKE MYSQL INSERT 쿼리문
   */
  getInsertQuery({ table, data }) {
    const column = Object.keys(data);
    const values = Object.values(data);

    if (column.length !== values.length) throw new Error();

    const c = column.join(",");
    const v = values.join("','");

    return `INSERT INTO ${table}(${c}) VALUES ('${v}')`;
  }

  /**
   * * MAKE MYSQL UPDATE 쿼리문
   */
  getUpdateQuery({ table, data, where }) {
    let c = "";

    for (const [column, value] of Object.entries(data)) {
      c += `${column}='${value}',`;
    }

    const rc = c.slice(0, -1);
    const rw = where.join(" AND ");

    return `UPDATE ${table} SET ${rc} WHERE ${rw}`;
  }

  /**
   * * MAKE MYSQL DELETE 쿼리문
   */
  getDeleteQuery() {
    console.log(`getDeleteQuery`);
  }

  /**
   * * 쿼리 DB 실행 함수
   * * new Promise 객체로 callback 없이 리턴값 받기
   * * all : 배열 전체 row : 오브젝트
   * ! 생성자에 정의된 타입에 맞춰주세요
   */
  excute({ database, sql, type }) {
    return new Promise(function (resolve, reject) {
      db.getConnection(database, function (err, connection) {
        if (err) {
          console.log(JSON.stringify(err));
        } else {
          connection.query(sql, function (err, data, option) {
            switch (type) {
              case "all":
                resolve(data);

                break;
              case "row":
                if (data) resolve(data[0]);
                else resolve(null);

                // resolve(data[0] || {});
                break;

              case "exec":
                console.log(data);

                resolve(data?.insertId);

                break;

              default:
                reject(true);

                break;
            }

            // When done with the connection, release it.
            connection.release();
          });
        }
      });
    });
  }
}

module.exports = Core;
