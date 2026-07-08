import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});


export async function register({ fullName, email, password }) {

  const { data } = await api.post(
    "/api/auth/register",
    {
      fullName,
      email,
      password
    }
  );

  return data;
}


export async function login({ email, password }) {

  const { data } = await api.post(
    "/api/auth/login",
    {
      email,
      password
    }
  );

  return data;
}


export async function logout(){

  const { data } = await api.post(
    "/api/auth/logout"
  );

  return data;
}


export async function getMe(){

  const { data } = await api.get(
    "/api/users/profile"
  );

  return data;
}


export default api;