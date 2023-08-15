// export aync functions

import * as usersAPI  from './users-api' // Wildcard to import all exports from the './users-api'

export async function signUp(userData) {
  // Delete the network request code to the
  // users-api.js module which will ultimately
  // return the JWT
  const token = await usersAPI.signUp(userData)
  // Persist the token to localStorage
  localStorage.setItem('token', token)
  return getUser()
}

export async function login(credentials) {
  const token = await usersAPI.login(credentials)
  // Persist the token to localStorage
  localStorage.setItem('token', token)
  return getUser()
}

export function getToken() {
  const token = localStorage.getItem('token') // built in method to retrieve token from storage
  // getItem will return null if no key
  if (!token) return null;
  const payload = JSON.parse(atob(token.split('.')[1]))
  // A JWT's expiration is expressed in seconds, not miliseconds
  if (payload.exp < Date.now() / 1000) {
    // Token has expired
    localStorage.removeItem('token')
    return null
  }
  return token
}

// fetch token
// if token exists:
// Decodes JWT token and extracts user information from it
export function getUser() {
  const token = getToken() // fetch JWT stored in browser via local storage
  return token ? JSON.parse(atob(token.split('.')[1])).user : null
}

export function logOut() {
  localStorage.removeItem('token')
}