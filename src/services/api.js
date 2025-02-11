import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000" });

// TODO: separate it into 2 service: AuthService and SessionService
// TODO: Add a request interceptor to send requests with tokem from local storage if exist
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   console.log(token)
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   } else {
//     delete config.headers.Authorization;
//   }
//   return config;
// });

export const signupUser = async (data) => {
  const response = await API.put("/auth/signup", data);
  // console.log(response.data);
  return response.data;
};

export const signinUser = async (data) => {
  const response = await API.post("/auth/signin", data);
  // console.log(response);
  return response.data;
};

// Helper function to retrieve the token from localStorage and return the header
const getAuthHeaders = () => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const userData = JSON.parse(storedUser);
    if (userData?.token) {
      return { Authorization: `Bearer ${userData.token}` };
    }
  }
  return {};
};

export const fetchSessions = async () => {
  const authHeader = getAuthHeaders();
  const response = await API.get("/session", { headers: authHeader });
  return response.data;
};

export const deleteSession = async (id) => {
  const authHeader = getAuthHeaders();
  const response = await API.delete(`/session/${id}`, { headers: authHeader });
  return response.data;
};

export const updateSessionStatus = async (id, newStatus) => {
  const authHeader = getAuthHeaders();
  const payload = { status: newStatus };
  const response = await API.put(`/session/${id}`, payload, {
    headers: authHeader,
  });
  return response.data;
};
