import axios from 'axios'

// Create an Axios instance
const server = axios.create({
  baseURL: process.env.REACT_APP_BE_URL,
})

// Add a request interceptor to attach the bearer token
server.interceptors.request.use(
  config => {
    // from localStorage
    const session = JSON.parse(localStorage.getItem('session') || '{}')

    if (session && session.accessToken) {
      config.headers['Authorization'] = `Bearer ${session.accessToken}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default server
