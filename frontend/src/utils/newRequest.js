import axios from "axios";

const newRequest = axios.create({
    baseURL:"https://myfiverr-7.onrender.com/api/",
    withCredentials:true,
})

export default newRequest;
