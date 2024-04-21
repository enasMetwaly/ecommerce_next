const { default: axiosClient } = require("./axiosClient");

const getLatestProduct=()=>axiosClient.get('/api/products')

export default {
    getLatestProduct
}