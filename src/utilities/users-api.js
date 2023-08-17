import sendRequest from './send-request'

const BASE_URL = '/api/users'

export function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData)
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials)
}

// Use browsers fetch function to send AJAX request
// to express server in order to create a vistor/guest
export function createGuest(userData) {
  return sendRequest(BASE_URL, 'POST', userData)
}