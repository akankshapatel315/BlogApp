import axios from "axios";

const axiosPost = (reqBody: any, url: string) => {
  const token = localStorage.getItem("accessToken");
  const config = {
    headers: { "x-access-token": token },
  };
  return new Promise((resolve, reject) => {
    axios
      .post(`http://localhost:3000/${url}`, reqBody, config)
      .then((response) => {
        if (response.status === 200) {
           resolve(response);
        }
      })
      .catch((error:any) => {
         reject(error);
      });
  });
};
const axiosGet = (reqBody: any, url: string) => {
  const token = localStorage.getItem("accessToken");
  const config = {
    headers: { "x-access-token": token },
  };

  return new Promise((resolve, reject) => {
    axios
      .get(`http://localhost:3000/${url}`, config)
      .then((response) => {
        if (response.status === 200) {
           resolve(response);
        }
      })
      .catch((error) => {
         reject(error);
      });
  });
};
const axiosGetWithPrams = (params: any, url: string) => {
  const token = localStorage.getItem("accessToken");
  const config = {
    headers: { "x-access-token": token },
  };

  return new Promise((resolve, reject) => {
    axios
      .get(`http://localhost:3000/${url}/${params}`, config)
      .then((response) => {
        if (response.status === 200) {
          return resolve(response);
        }
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
export { axiosPost, axiosGet };
