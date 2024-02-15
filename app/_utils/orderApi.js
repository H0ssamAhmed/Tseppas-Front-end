import axiosClient from "./axiosClient";

const createOrder = (orderData) => axiosClient.post("/orders", orderData)
const getUserOrder = (email) => axiosClient.get(`/orders?populate[products][populate][0]=banner&filters[email][$eq]=${email}`)

export default {
    createOrder,
    getUserOrder
}