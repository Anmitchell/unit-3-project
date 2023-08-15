import { Component } from "react";
import { signUp } from '../../utilities/users-service';

export default class SignUpForm extends Component {
state = {
  name: '',
  email: '',
  password: '',
  confirm: '',
  error: ''
}

// The handleChange function is designed to update the component's state with new values coming from input fields. This pattern is commonly used in forms, where the state reflects the values of the input fields, and changes to input fields trigger updates to the state.
handleChange = (evt) => {
  this.setState({
    [evt.target.name]: evt.target.value,
    error: ''
  })
}

handleSubmit = async (evt) => {
  evt.preventDefault() // prevents browser refresh when submitting form to handle forms through javascript instead of default html form behavior
  try {
    const formData = {...this.state}
    delete formData.confirm
    delete formData.error
    // The promise returned by the signUp service method
    // will resolve to the user object included in the
    // payload of the JSON Web Token (JWT)
    const user = await signUp(formData)
    // Baby step
    // This line calls the setUser function that is passed down as a prop from the parent component. It updates the user information in the parent component's state, typically used to manage the user's authentication status or profile.
    this.props.setUser(user)
  } catch {
    // An error happened on the server
    this.setState({ error: 'Sign Up Failed - Try Again' })
  }
}

// We must override the render method
// The render method is the equivalent to a function-based component
// (its job is to return the UI)
render() {
  const disable = this.state.password !== this.state.confirm // if true enable submit, if false disable submit
  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <label>Name</label>
          <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
          <label>Email</label>
          <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
          <label>Password</label>
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
          <label>Confirm</label>
          <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
          <button type="submit" disabled={disable}>SIGN UP</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{this.state.error}</p>
    </div>
  )
}
}