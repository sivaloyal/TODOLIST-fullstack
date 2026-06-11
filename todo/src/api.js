import axios from "axios";

const API = axios.create({
  baseURL: "https://todolist-fullstack-8n32.onrender.com/api"
});

export default API;
