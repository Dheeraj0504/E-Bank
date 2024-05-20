import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  // console.log(props)
  const {history} = props

  const onClickLogoutBtn = () => {
    // console.log("Logout Btn Clicked")
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }
  return (
    <nav className="nav-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
        alt="website logo"
        className="website-logo"
      />
      <button
        type="button"
        className="logout-button"
        onClick={onClickLogoutBtn}
      >
        Logout
      </button>
    </nav>
  )
}
export default withRouter(Header)
