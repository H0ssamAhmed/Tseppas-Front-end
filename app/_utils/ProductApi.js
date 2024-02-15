const { default: axiosClient } = require("./axiosClient");

const getProducts = () => axiosClient.get("/products?populate=*")
const getSingleProduct = (id) => axiosClient.get(`/products/${id}?populate=*`)
const getFilterItems = (category, id) => axiosClient.get(`/products?[filters][category][$eq]=${category}&[filters][id][$ne]=${id}&populate=*`)
const getByCategory = (category) => axiosClient.get(`/products?[filters][category][$eq]=${category}&populate=*`)
const getCategories = () => axiosClient.get("/Categories?populate=*")
const getCart = () => axiosClient.get("/carts")
export default {
    getProducts,
    getSingleProduct,
    getFilterItems,
    getByCategory,
    getCategories,
    getCart
}