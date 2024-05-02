
const { default: axiosClient } = require("./axiosClient");

const createOrder=(data)=>axiosClient.post('api/orders',data)

export default {
    createOrder
}