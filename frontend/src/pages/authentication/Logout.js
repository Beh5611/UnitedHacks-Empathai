// import React from 'react'
import Cookies from 'js-cookie'

const Logout = () => {
    Cookies.remove("cookies")
    window.location.href = "http://localhost:3000/login"
  return (
    null
  )
}

export default Logout