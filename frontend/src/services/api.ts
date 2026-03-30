import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000/" //rota base da api do express.
})

export default api;