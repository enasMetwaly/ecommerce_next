const { default: axiosClient } = require("./axiosClient");

const addToCart=(payload)=>axiosClient.post('api/carts',payload)

//to avoid cart items dissapear after refresh you should call api from database: take email to get user data
const getUserCartItems=(email)=>axiosClient.get(`api/carts?populate[products][populate]=banner&filter[email][$eq]=${email}`)

export default {
    addToCart,
    getUserCartItems
}