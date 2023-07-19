import axios from 'axios'

const instance = axios.create({
    baseURL : 'http://localhost:5000'
})

instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    let token = window.localStorage.getItem('persist:auth') && JSON.parse(window.localStorage.getItem('persist:auth'))?.token?.slice(1, -1)
    config.headers = {
      authorization: token ? `Bearer ${token}` : null
  }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
instance.interceptors.response.use(function (response) {
    // refresh token
    return response;
}, function (error) {
    return Promise.reject(error);
});
  export default instance
