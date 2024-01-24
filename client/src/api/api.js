import axios from "axios";

const instance = axios.create({
  baseURL: "https://bookme-k9xo.onrender.com",
});

export default instance;
