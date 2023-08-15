import sendRequest from './send-request'

const BASE_URL = '/api/users' // path to users route

export function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData) // path is used to make a post request
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials)
}