import axios from "axios";

export const api = axios.create({
  baseURL: 'http://apiurl',
  timeout: 1000
});
