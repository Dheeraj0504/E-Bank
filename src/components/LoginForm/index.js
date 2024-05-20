import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    userId: '',
    userPin: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    // console.log(this.props)
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 2})

    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitUserDetails = async event => {
    event.preventDefault()
    const {userId, userPin} = this.state
    const loginUrl = 'https://apis.ccbp.in/ebank/login'
    const userDetails = {user_id: userId, pin: userPin}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginUrl, options)
    const data = await response.json()
    // console.log(data)
    // console.log(response)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onEnterUserId = event => {
    // console.log(event.target.value)
    this.setState({userId: event.target.value})
  }

  onEnterUserPIN = event => {
    // console.log(event.target.value)
    this.setState({userPin: event.target.value})
  }

  render() {
    const {userId, userPin, showSubmitError, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="login-image-container">
            <img
              className="login-form-image"
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
            />
          </div>
          <form className="form-container" onSubmit={this.onSubmitUserDetails}>
            <h1 className="form-heading">Welcome Back!</h1>
            <div className="input-container">
              <label htmlFor="userId" className="label">
                User ID
              </label>
              <input
                type="text"
                id="userId"
                className="input-box"
                placeholder="Enter User ID"
                value={userId}
                onChange={this.onEnterUserId}
              />
            </div>
            <div className="input-container">
              <label htmlFor="userPin" className="label">
                PIN
              </label>
              <input
                type="password"
                id="userPin"
                className="input-box"
                placeholder="Enter PIN"
                value={userPin}
                onChange={this.onEnterUserPIN}
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {/** Using Logical && Operator */}
            {showSubmitError && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
