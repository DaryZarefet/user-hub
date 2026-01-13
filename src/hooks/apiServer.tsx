import axios from "axios";
export const BASE_URL = "http://localhost:9000/";

export const apiServer = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProfile = async () => {
  const response = await apiServer.get("/api/v1/users/me");
  return response.data;
};
