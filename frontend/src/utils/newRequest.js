import axios from "axios";

const newRequest = axios.create({
    baseURL:"https://myfiverr-6.onrender.com/api/",
    withCredentials:true,
})

export default newRequest;
