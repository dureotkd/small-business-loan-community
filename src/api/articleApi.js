import axios from "axios";
import { baseServerUrl } from "../helper/port";

const articleApi = {};

/**
 *
 */

articleApi.getRowByPk = (id) => {
  axios({
    methods: "get",
    url: `${baseServerUrl}/api/article`,
    params: {
      id,
    },
  })
    .then(({ data, status }) => {})
    .catch((err) => {
      console.log(`articleApi getRowByPk => ${err}`);
    });
};

export default articleApi;
