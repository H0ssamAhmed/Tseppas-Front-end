import axiosClient from "./axiosClient"

const addTocart = (payload) => axiosClient.post('/carts', payload)
const getUserCartItems = (email) => axiosClient.get(`/carts?populate[products][populate][0]=banner&filters[email][$eq]=${email}`)
const deletItem = (id) => axiosClient.delete(`/carts/${id}`)
const updateItem = (id, payload) => axiosClient.put(`/carts/${id}`, payload)
const clearCart = () => axiosClient.delete('/carts')


export default {
    addTocart,
    getUserCartItems,
    deletItem,
    updateItem,
    clearCart
}