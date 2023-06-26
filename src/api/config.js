import axios from "axios";
import { getEnviroments } from "../helpers/getEnviroments";

const { VITE_API_URL } = getEnviroments();

const apiRecabol = axios.create({
    baseURL: VITE_API_URL
})


export default apiRecabol