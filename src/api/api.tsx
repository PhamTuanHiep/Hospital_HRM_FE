import axios from "axios";
import { APIHHRM } from "./api.constant";

const instance = axios.create({
  baseURL: APIHHRM,
  timeout: 48000,
  headers: {
    Accept: "application/json",
    // "Content-Type": "application/json",
    // "Content-Type": "multipart/form-data",
  },
});

// Thêm interceptor trước khi gửi yêu cầu
instance.interceptors.request.use(
  (config) => {
    // Kiểm tra xem token đã tồn tại hay không
    const token = localStorage.getItem("token");
    // console.log("ckeck token:",token)
    // console.log("ckeck config:", config);

    // Nếu token tồn tại, thêm nó vào header của yêu cầu
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["Content-Type"] = `application/x-www-form-urlencoded`;
      // console.log("add token:",config.headers)
    }
    return config;
  },
  (error) => {
    // Xử lý lỗi request
    return Promise.reject(error);
  }
);

//response
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log("response:instance:",response)
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log("error:instance:",error)
    return Promise.reject(error);
  }
);
export default instance;
