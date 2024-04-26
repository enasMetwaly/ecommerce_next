const { default: axiosClient } = require("./axiosClient");

const getLatestProduct = () => axiosClient.get('api/products?populate=*');

// Corrected getProductById with 'id' parameter
const getProductById = (id) => axiosClient.get(`api/products/${id}?populate=*`);


//product recommendation
// Corrected API endpoint
const getProductByCategory = (category) =>
  axiosClient.get(`/api/products?filters[category][$eq]=${category}&populate=*`);

export default {
    getLatestProduct,
    getProductById,
    getProductByCategory
};
