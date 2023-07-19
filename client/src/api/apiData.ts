import axios from "axios";
import { NewUser } from "../models/newUser";

const BASE_URL = "http://localhost:5001"

const auth: Record<string, string> = {
  signin: "/api/create-user",
  login: "/api/login-user",
};

export const apiData = {
  //auth
  signIn: (newUser: NewUser) => axios.post(`${BASE_URL}${auth.signin}`, newUser),
  login: (newUser: NewUser) => axios.post(`${BASE_URL}${auth.login}`, newUser),
};
