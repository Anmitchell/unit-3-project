import { useState } from 'react'
import * as usersService from '../../utilities/users-service'

// Define state variable using useState hook to store the user's email, password, and error messages
export default function LoginForm({ setUser }) {
const [credentials, setCredentials] = useState({
  email: '',
  password: ''
});
const [error, setError] = useState('')

// Updates the state as the user types in the email and password input fields
function handleChange(evt) {
  setCredentials({ ...credentials, [evt.target.name]: evt.target.value })
  setError('');
}

// Function that is called when form is submitted
async function handleSubmit(evt) {
  // Prevent form from being submitted using via html way
  evt.preventDefault();
  try {
    // The promise returned by the signUp service method
    // will resolve to the user object included in the
    // payload of the JSON Web Token (JWT)
    // calls the userService function to attempt user login, sets the user
    // object in the parent components state upon successful login, and displays an error
    // message if login fails
    const user = await usersService.login(credentials)
    setUser(user)
  } catch {
    setError('Log In Failed - Try Again')
  }
}

return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="text" name="email" value={credentials.email} onChange={handleChange} required />
          <label>Password</label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
          <button type="submit">LOG IN</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  )
  }