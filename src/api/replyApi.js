import axios from "axios";
import { baseServerUrl } from "../helper/port";

const replyApi = {};

replyApi.save = async () => {
  return new Promise((resolve, reject) => {
    axios({
      methods: "patch",
      url: `${baseServerUrl}/api/reply`,
    })
      .then(({ data, status }) => {
        resolve(data);
      })
      .catch((err) => {
        console.log(`replyApi getRowByPk => ${err}`);
      });
  });
};

replyApi.getAll = async () => {
  return new Promise((resolve, reject) => {
    axios({
      methods: "get",
      url: `${baseServerUrl}/api/replies`,
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
