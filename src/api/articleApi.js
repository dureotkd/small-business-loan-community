import axios from "axios";
import { baseServerUrl } from "../helper/port";

const articleApi = {};

articleApi.getAll = async () => {
  return new Promise((resolve, reject) => {
    axios({
      methods: "get",
      url: `${baseServerUrl}/api/articles`,
    })
      .then(({ data, status }) => {
        resolve(data);
      })
      .catch((err) => {
        console.log(`articleApi getRowByPk => ${err}`);
      });
  });
};

/**
 *
 */
articleApi.getRowByPk = async (id) => {
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
        console.log(`articleApi getRowByPk => ${err}`);
      });
  });
};

export default articleApi;
