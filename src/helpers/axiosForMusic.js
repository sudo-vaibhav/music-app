import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'

const cache = setupCache({
  maxAge: 15 * 60 * 1000,
})

const axiosForMusic = axios.create({
  adapter: cache.adapter, // we are using this cache adapter to improve performance
  baseURL: 'https://iste-musicapp.azurewebsites.net/api',
})

axiosForMusic.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  },
)

export default axiosForMusic
