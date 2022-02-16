import { baseServerUrl } from "../helper/port";
import axios from "axios";

const replyApi = {};

replyApi.save = async ({ seq, id, reply }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "patch",
      url: `${baseServerUrl}/api/reply`,
      params: {
        seq,
        id,
        reply,
      },
    })
      .then(({ data, status }) => {
        resolve(data);
      })
      .catch((err) => {
        console.log(`replyApi getRowByPk => ${err}`);
      });
  });
};

replyApi.getAll = async (id) => {
  return new Promise((resolve, reject) => {
    axios({
      methods: "get",
      url: `${baseServerUrl}/api/replies`,
      params: {
        id,
      },
    })
      .then(({ data, status }) => {
        resolve(data);
      })
      .catch((err) => {
        console.log(`replyApi getRowByPk => ${err}`);
      });
  });
};

/**
 *
 */
replyApi.getRowByPk = async (id) => {
  return new Promise((resolve, reject) => {
    axios({
      methods: "get",
      url: `${baseServerUrl}/api/article`,
      params: {
        id,
      },
    })
      .then(({ data, status }) => {
        resolve(data);
      })
      .catch((err) => {
        console.log(`replyApi getRowByPk => ${err}`);
      });
  });
};

export default replyApi;
