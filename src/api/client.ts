import axios from "axios";

const client = axios.create({
    baseURL:'http://192.168.254.124:8989',
})

export default client