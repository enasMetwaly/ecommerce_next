const { default: axios } = require("axios")

const api_key=process.env.NEXT_PUBLIC_REST_API_KEY
const apiUrl='http://localhost:1337'

const axiosClient=axios.create({
    baseURL:apiUrl,
    headers:{
        Authorization:`Bearer ${api_key}`
    }
})

export default axiosClient;
