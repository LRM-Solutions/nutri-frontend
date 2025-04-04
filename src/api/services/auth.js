export default (httpClient) => ({
  nutricionistaLogin: (data) => {
    return httpClient.post("/login-nutri", data);
  },
  userInfo: () => {
    return httpClient.get(`/profile`);
  },
  registerUser: (data) => {
    return httpClient.post("/sign-up", data);
  },
});
