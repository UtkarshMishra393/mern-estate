import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

// This Component is protecting the profile page, if user in
// not authenticated then it will navigate to the sign in page.
export default function PrivateRoute() {
    const {currentUser} = useSelector(state => state.user)
  return (
    currentUser ? <Outlet/> : <Navigate to='/sign-in'/>
  )
}
