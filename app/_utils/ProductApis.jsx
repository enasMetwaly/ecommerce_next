const { default: axiosClient } = require("./axiosClient");

const getLatestProduct = () => axiosClient.get('api/products?populate=*');

// Corrected getProductById with 'id' parameter
const getProductById = (id) => axiosClient.get(`api/products/${id}?populate=*`);

export default {
    getLatestProduct,
    getProductById
};
