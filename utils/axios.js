import axios from "axios";
//import { clearStore } from "../features/user/userSlice";


export const urlBase ="http://192.168.100.154:8080";
  //"http://ec2-15-188-207-170.eu-west-3.compute.amazonaws.com:8080";
  //"/api";

const customFetch = axios.create({
  baseURL: urlBase,
});

/* customFetch.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();
  if (user) {
    config.headers['Authorization'] = `Bearer ${user.token}`;
  }
  return config;
});
*/
// export const checkForUnauthorizedResponse = (error, thunkAPI) => {
//   if (error.response.status === 401) {
//     thunkAPI.dispatch(clearStore());
//     return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
//   }
//   return thunkAPI.rejectWithValue(error.response.data);
// };

export default customFetch;
