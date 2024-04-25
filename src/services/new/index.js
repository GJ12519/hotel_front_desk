import axios from "axios";
// import { BASE_URL, TIMEOUT } from "./config"

class newHYRequest {
    constructor() {
        this.instance = axios.create({
            baseURL: "http://127.0.0.1:8088",
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        //响应拦截器
        this.instance.interceptors.response.use((res) => {
            return res.data
        }, err => {
            return err
        })
    }

    request(config) {
        // console.log(config);
        return this.instance.request(config)
    }

    get(config) {
        // console.log(config);
        return this.request({ ...config, method: "get" })
    }

    post(config) {
        console.log(config);
        return this.request({ ...config, method: "post" })
    }
}

const newRequest = new newHYRequest()
export default newRequest