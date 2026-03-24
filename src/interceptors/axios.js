import axios from "axios";
import cookies from "vue-cookies";

axios.defaults.baseURL = "https://onela.yoursrecord.com/api";
axios.defaults.headers.authorization = "Bearer " + cookies.get("token");
