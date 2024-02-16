import { default as axios } from "axios"

const apikey = process.env.NEXT_PUBLIC_REST_API_KEY
// const apiUrl = 'http://localhost:1337/api'// this will cahnge to serve url after deploy stapi back end
const apiUrl = "https://active-charity-b4689a9b21.strapiapp.com/api"

const axiosClient = axios.create({
    baseURL: apiUrl,
    headers: {
        Authorization: `Bearer ${apikey}`
    }
})

export default axiosClient