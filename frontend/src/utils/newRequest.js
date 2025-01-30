import axios from "axios";

const newRequest = axios.create({
    baseURL:"https://myfiverr-4.onrender.com/api/",
    withCredentials:true,
})

export default newRequest;
