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

// Add a response interceptor to handle Forbidden errors, delete the session, and redirect to login
server.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response && error.response.status === 403) {
      // Delete the session from localStorage
      localStorage.removeItem('session')

      // Redirect to login page
      window.location.href = '/login' // Or use `history.push('/login')` if using React Router
    }
    return Promise.reject(error)
  }
)

export default server
