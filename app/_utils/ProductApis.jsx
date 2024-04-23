const { default: axiosClient } = require("./axiosClient");

const getLatestProduct=()=>axiosClient.get('api/products?populate=*')

export default {
    getLatestProduct
}