import jwt_decode from "jwt-decode";
import { redirect } from 'react-router-dom';

interface DecodedToken {
    id: string,
   username:string,
   role: string,
   iat: number,
   exp: number
  }

export const setToken = (token: string) => {
    if (!token) throw new Error("No token provided")

    sessionStorage.setItem("jwt_token", JSON.stringify(token));
}

export const getToken = () => {
    const token = sessionStorage.getItem("jwt_token");
    if (!token) throw new Error("No token provided")
    return  JSON.parse(token).token;
}

export const removeToken = () => {
    sessionStorage.removeItem("jwt_token");
    redirect('/login')
}

export const parseToken = () => {
    const token = getToken();
  
    if (!token) throw new Error("No token provided");
     
    return jwt_decode<DecodedToken>(token);
  };

export const getRole = (): string => parseToken().role.toLowerCase();